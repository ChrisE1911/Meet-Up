const express = require('express');

const { Group, GroupImage, Membership, User, Attendance, Event, Venue, EventImage, ProfileImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const sequelize = require('sequelize')

const router = express.Router();


//Add an image to profile

router.post('/profile/images', requireAuth, async (req, res, next) => {
    let { user } = req;

    const { url, preview } = req.body;

    let newImage = await ProfileImage.create({
        preview,
        url,
        userId: user.id
    })

    newImage = newImage.toJSON();

    res.json(newImage)
})

module.exports = router;
