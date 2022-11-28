const express = require('express');

const { Group, GroupImage, Membership, User, Attendance, Event, Venue, EventImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const sequelize = require('sequelize')

const router = express.Router();




//Add an Image to an Event

router.post('/:eventId/images', requireAuth, async (req, res, next) => {
    const event = await Event.findByPk(req.params.eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = "Event does not exist";
        err.errors = ["Event couldn't be found"];
        return next(err);
    }

    console.log(event)

    const { url, preview } = req.body;

    let newImage = await event.createEventImage({
        url,
        preview
    })

    newImage = newImage.toJSON();

    delete newImage['updatedAt'];
    delete newImage['createdAt'];
    delete newImage['eventId'];

    res.json(newImage)
})

//Get all Events

router.get('/', async (req, res, next) => {
    const events = await Event.findAll({
        include: [
            { model: Group, attributes: ['id', 'name', 'city', 'state'] },
            { model: Venue, attributes: ['id', 'city', 'state'] },
        ]
    });

    res.json({
        Events: events
    })
})

// Get details of an Event specified by its id

router.get('/:eventId', async (req, res, next) => {
    let event = await Event.findByPk(req.params.eventId, {
        include: [
            { model: Group, attributes: ['id', 'name', 'private', 'city', 'state'] },
            { model: Venue, attributes: ['id', 'address', 'city', 'state', 'lat', 'lng'] },
            { model: EventImage, attributes: ['id', 'url', 'preview'] }
        ],

        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.status = 404;
        err.title = "Event does not exist";
        err.errors = ["Event couldn't be found"];
        return next(err);
    }

    let numAttending = await Attendance.count({
        where: {
            eventId: req.params.eventId
        }
    })
    event = event.toJSON();

    event.numAttending = numAttending;


    res.json(event)
})

//Edit an event

router.put('/:eventId', requireAuth, async (req, res, next) => {
    const event = await Event.findByPk(req.params.eventId, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found"
        err.status = 404;
        err.errors = ["Event couldn't be found"]
        return next(err)
    }

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    if (!venueId) {
        const err = new Error("Venue couldn't be found");
        err.title = "Venue couldn't be found"
        err.status = 404;
        err.errors = ["Venue couldn't be found"]
        return next(err)
    }

    if (venueId) {
        event.venueId = venueId;
    }
    if (name) {
        event.name = name;
    }
    if (type) {
        event.type = type;
    }
    if (capacity) {
        event.capacity = capacity;
    }
    if (price) {
        event.price = price;
    }
    if (description) {
        event.description = description;
    }
    if (startDate) {
        event.startDate = startDate;
    }
    if (endDate) {
        event.endDate = endDate;
    }

    event.save();

    res.json(await event)
});

// Request Attendance to an Event

router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
    let event = await Event.findByPk(req.params.eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found"
        err.status = 404;
        err.errors = ["Event couldn't be found"]
        return next(err)
    }

    event = event.toJSON();


    // const { userId, status } = req.body;

    let { user } = req;

    user = user.toJSON()

    // console.log(user)

    // console.log(req.body)


    const attendee = await Attendance.findOne({
        attributes: {
            exclude: ['id']
        },
        where: {
            eventId: event.id,
            userId: user.id
        }
    })

    if (!attendee) {
        let newAttendee = await Attendance.create({
            userId: user.id,
            eventId: event.id,
            status: 'pending'
        })

        console.log(newAttendee);

        newAttendee = newAttendee.toJSON();
        delete newAttendee['updatedAt'];
        delete newAttendee['createdAt'];

        res.json(newAttendee)
    } else {
        if (attendee.status === 'pending') {
            const err = new Error("Attendance has already been requested");
            err.status = 400;
            err.title = "Attendance already exists";
            err.errors = ["Attendance has already been requested"];
            return next(err);
        } else {
            const err = new Error("User is already an attendee of the event");
            err.status = 400;
            err.title = "User is already an attendee";
            err.errors = ["User is already an attendee of the event"];
            return next(err)
        }
    }
})

//Change the status of an attendance for an event specified by id

router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {

    let event = await Event.findByPk(req.params.eventId);

    if (!event) {
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found"
        err.status = 404;
        err.errors = ["Event couldn't be found"]
        return next(err)
    };

    event = event.toJSON();

    let { user } = req;

    user = user.toJSON();

    let groups = await Group.findAll({
        where: {
            organizerId: user.id
        },
        raw: true
    })


    for (let group of groups) {

        if (user.id === group.organizerId) {

            const { userId, status } = req.body;

            let attendance = await Attendance.findOne({
                where: {
                    eventId: event.id,
                    userId: userId
                }
            })

            if (status) {
                attendance.status = status
            }

            delete group['updatedAt'];
            delete group['createdAt'];

            res.json(attendance)

            await attendance.save();
        }

    }


});

//GET ALL ATTENDEES OF AN EVENT

router.get('/:eventId/attendees', async (req, res, next) => {
    let event = await Event.findByPk(req.params.eventId);


    if (!event) {
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found"
        err.status = 404;
        err.errors = ["Event couldn't be found"]
        return next(err)
    };

    event = event.toJSON()


    let attendees = await Attendance.findAll({
        where: {
            eventId: event.id
        },
        include: [{
            model: User,
            attributes: []
        }],
        attributes: {
            include: [[sequelize.col('User.id'), 'id'],
            [sequelize.col('User.firstName'), 'firstName'],
            [sequelize.col('User.lastName'), 'lastName']
            ],
            exclude: ['eventId', 'status']
        },
        raw: true
    })

    for (let attendee of attendees) {

        let attendanceStatus = await Attendance.findOne({
            where: {
                eventId: event.id,
                userId: attendee.userId
            },
            attributes: {
                exclude: ['id', 'eventId', 'userId']
            }
        })

        delete attendee['userId']

        attendee.Attendance = attendanceStatus


    }
    res.json({
        Attendees: attendees
    })
})

router.delete('/:eventId/attendance', requireAuth, async (req, res, next) => {

    let event = await Event.findByPk(req.params.eventId);

    event = event.toJSON();

    let { user } = req;


    user = user.toJSON();

    let groups = await Group.findOne({
        where: {
            organizerId: user.id
        },
        raw: true
    })


    if (user.id === groups.organizerId) {
        const { memberId } = req.body;
        let attendance = await Attendance.findOne({
            where: { userId: memberId }
        })

        await attendance.destroy();
        // console.log(attendance)
        res.json({
            message: "Successfully deleted attendance from event"
        })
    }

})

module.exports = router;
