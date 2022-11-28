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
        let image = await GroupImage.findByPk(req.params.imageId);

        if (!image) {
            const err = new Error('Group image could not be found')
            err.status = 404;
            err.title = "Group image doesn't exist";
            err.errors = ['Group image could not be found']
            return next(err)
        }

        console.log(image)


        await image.destroy();

        res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    }
})


module.exports = router
