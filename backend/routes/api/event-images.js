const express = require('express');

const { Group, GroupImage, Membership, User, Attendance, Event, Venue, EventImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const sequelize = require('sequelize')

const router = express.Router();



router.delete('/:imageId', requireAuth, async (req, res, next) => {
    let { user } = req;

    user = user.toJSON();


    let group = await Group.findOne({
        where: {
            organizerId: user.id
        }
    })

    // console.log(group)

    if (user.id === group.organizerId) {

        const eventImage = await EventImage.findByPk(req.params.imageId);

        if (!eventImage) {
            const err = new Error('Event image could not be found')
            err.status = 404;
            err.title = "Event image doesn't exist";
            err.errors = ['Event image could not be found']
            return next(err)
        }

        await eventImage.destroy();

        res.json({
            message: 'Event image could not be found',
            statusCode: 200
        })

    }


})


module.exports = router;
