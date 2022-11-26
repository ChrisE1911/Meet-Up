const express = require('express');

const { Group, GroupImage, Membership, User, Attendance, Event, Venue, EventImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const sequelize = require('sequelize')

const router = express.Router();


//GET ALL GROUPS

router.get('/', async (req, res, next) => {

    //find all groups

    const allGroups = await Group.findAll();

    //declare newArr for manipulation
    let newArr = []

    for (let group of allGroups) {
        //reassign to .toJSON() to be able to manipulate the object and add in what you need to add in
        group = group.toJSON();

        //grab the number of members associated with the group and assign it to a variable
        let numMembers = await Membership.count({
            where: {
                groupId: group.id
            }
        })
        //grab the group images assigned to that group and is the preview image
        let groupImage = await GroupImage.findOne({
            where: {
                groupId: group.id,
                preview: true
            },
            //set raw to true to get that actual json object
            raw: true
        })

        // console.log(numMembers)

        group.numMembers = numMembers;
        group.previewImage = groupImage.url;

        newArr.push(group);
    }
    res.json({
        Groups: newArr
    })
});

//Get all Groups by current User

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    let currentUser = user.id

    console.log(user.id)

    const currentUserGroup = await Group.findAll({
        where: {
            organizerId: currentUser
        }
    })

    let newArr = [];

    for (let group of currentUserGroup) {
        group = group.toJSON();

        let numMembers = await Membership.count({
            where: {
                groupId: group.id
            }
        });

        let groupImage = await GroupImage.findOne({
            where: {
                groupId: group.id,
                preview: true
            },
            //set raw to true to get that actual json object
            raw: true
        });
        group.numMembers = numMembers;
        group.previewImage = groupImage.url

        console.log(group)

        newArr.push(group)
    }

    res.json({
        Groups: newArr
    })
});

//Create a group

router.post('/', requireAuth, async (req, res, next) => {

    const { name, about, type, private, city, state } = req.body;

    const { user } = req;

    const newGroup = await Group.create({
        name: name,
        organizerId: user.id,
        about: about,
        type: type,
        private: private,
        city: city,
        state: state
    })
    res.json(newGroup)
});

//Add an image to a group
router.post('/:groupId/images', requireAuth, async (req, res, next) => {

    const currentGroup = await Group.findByPk(req.params.groupId);

    console.log(currentGroup)

    if (!currentGroup) {
        const err = new Error("Group does not exist");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    const { preview, url } = req.body;

    let newImage = await GroupImage.create({
        preview,
        url,
        groupId: req.params.groupId
    })

    newImage = newImage.toJSON();

    newImage = await GroupImage.findByPk(newImage.id)

    res.json(newImage)

});

//Get Details of a Group By Id

router.get('/:groupId', async (req, res, next) => {

    let group = await Group.findByPk(req.params.groupId, {
        include: {
            model: GroupImage
        }
    });

    let venue = await Venue.findAll({
        where: {
            groupId: req.params.groupId
        },
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
    })

    let numMembers = await Membership.count({
        where: {
            groupId: req.params.groupId
        }
    })

    // console.log(numMembers)

    const user = await group.getUser({
        attributes: ['id', 'firstName', 'lastName']
    });

    console.log(user)

    group = group.toJSON();


    group.numMembers = numMembers
    group.Organizer = user;
    group.Venues = venue;


    // console.log(group)

    if (!group) {
        const err = new Error("Group does not exist");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    };
    res.json(group)
})

//Edit a Group

router.put('/:groupId', requireAuth, async (req, res, next) => {
    const currentGroup = await Group.findOne({
        where: {
            id: req.params.groupId
        }
    });
    // console.log(currentGroup)
    if (!currentGroup) {
        const err = new Error("Group does not exist");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    const { name, about, type, private, city, state } = req.body;

    if (name) {
        currentGroup.name = name
    };
    if (about) {
        currentGroup.about = about
    };
    if (type) {
        currentGroup.type = type
    };
    if (private) {
        currentGroup.private = private
    };
    if (city) {
        currentGroup.city = city
    };
    if (state) {
        currentGroup.state = state
    };

    currentGroup.save();

    res.json(await currentGroup)
});

//Create a New Venue for a Group By Id

router.post('/:groupId/venues', requireAuth, async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId);

    if (!group) {
        const err = new Error("Group does not exist");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    const { address, city, state, lat, lng } = req.body;

    let newVenue = await group.createVenue({
        address,
        groupId: req.params.groupId,
        city,
        state,
        lat,
        lng
    })

    newVenue = newVenue.toJSON();

    delete newVenue['createdAt'];
    delete newVenue['updatedAt'];


    res.json(newVenue)

});

// Get All Venues for a Group By Id

router.get('/:groupId/venues', requireAuth, async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId);

    if (!group) {
        const err = new Error("Group does not exist");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    const groupVenues = await Venue.findAll({
        where: {
            groupId: req.params.groupId
        }
    });

    console.log(groupVenues)
    res.json({
        Venues: groupVenues
    },)
});

// Create an Event by Group Id

router.post('/:groupId/events', requireAuth, async (req, res, next) => {
    const group = await Group.findByPk(req.params.groupId);

    if (!group) {
        const err = new Error("Group does not exist");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    let event = await Event.create({
        venueId,
        groupId: +req.params.groupId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate
    })

    event = event.toJSON();

    delete event['createdAt'];
    delete event['updatedAt'];

    res.json(event)
})

//Get all events by Group ID

router.get('/:groupId/events', async (req, res, next) => {

    const group = await Group.findByPk(req.params.groupId);


    if (!group) {
        const err = new Error("Group does not exist");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    const groupEvent = await Event.findAll({
        where: {
            groupId: req.params.groupId
        },
        include: [
            { model: Group, attributes: ['id', 'name', 'city', 'state'] },
            { model: Venue, attributes: ['id', 'city', 'state'] }
        ],
        attributes: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate']
    })


    let newArr = []

    for (let event of groupEvent) {
        event = event.toJSON();

        let numAttending = await Attendance.count({
            where: {
                eventId: event.id
            }
        })

        let eventImage = await EventImage.findOne({
            where: {
                eventId: event.id,
                preview: true
            }
        })
        // console.log(eventImage)
        event.numAttending = numAttending;
        event.previewImage = eventImage.url


        newArr.push(event)
    }


    res.json({
        Events: newArr
    })
});

//Request a Membership for a Group based on the Group's id

router.post('/:groupId/membership', requireAuth, async (req, res, next) => {
    let group = await Group.findByPk(req.params.groupId);


    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    group = group.toJSON()

    let { user } = req;

    user = user.toJSON();

    const memberships = await Membership.findOne({
        where: {
            groupId: group.id,
            userId: user.id
        }
    })

    if (!memberships) {
        let newMembership = await Membership.create({
            userId: user.id,
            groupId: group.id,
            status: 'pending'
        })

        res.json(newMembership)
    }
     else {
        if (memberships) {
            if (memberships.status === 'pending') {
                const err = new Error("Current User already has a pending membership for the group");
                err.status = 400;
                err.title = "Membership has already been requested";
                err.errors = ["Current User already has a pending membership for the group"];
                return next(err);
            } else {
                const err = new Error("User is already a member of the group");
                err.status = 400;
                err.title = "User is already a member";
                err.errors = ["User is already a member of the group"];
                return next(err)
            }
        }
    }
});

//Change the status of a membership for a group specified by id

router.put('/:groupId/membership', requireAuth, async (req, res, next) => {

    let group = await Group.findByPk(req.params.groupId);

    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = "Group does not exist";
        err.errors = ["Group couldn't be found"];
        return next(err);
    }

    group = group.toJSON();

    // console.log(group)

    let { user } = req;

    user = user.toJSON();


    if (user.id === group.organizerId) {
        let membership = await Membership.findOne({
            where: {
                groupId: group.id,
                status: 'pending'
            }
        })

            const { memberId, status } = req.body;

            if (memberId) {
                membership.memberId = memberId
            };

            if (status) {
                membership.status = status
            }

            membership.save();


            res.json(await membership)
        }
})




module.exports = router;
