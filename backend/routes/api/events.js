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
        include:[
            { model: Group, attributes: ['id', 'name', 'city', 'state']},
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
            { model: Group, attributes: ['id', 'name', 'private', 'city', 'state']},
            { model: Venue, attributes: ['id', 'address', 'city', 'state', 'lat', 'lng'] },
            { model: EventImage, attributes: ['id', 'url', 'preview'] }
        ],

        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    let numAttending = await Attendance.count({
        where: {
            eventId: req.params.eventId
        }
    })
    event = event.toJSON();

    event.numAttending = numAttending;


    res.json(event)
})

module.exports = router;
