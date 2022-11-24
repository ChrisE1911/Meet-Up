const express = require('express');

const { Group, GroupImage, Membership, User, Attendance, Event, Venue, EventImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const sequelize = require('sequelize')


const router = express.Router();


// Edit a Venue

router.put('/:venueId', requireAuth, async (req, res, next) => {
    let venue = await Venue.findByPk(req.params.venueId);

    if (!venue) {
        const err = new Error("Venue couldnt't be found");
        err.status = 404;
        err.title = "Venue does not exist";
        err.errors = ["Venue couldn't be found"];
        return next(err);
    }

    const { address, city, state, lat, lng } = req.body;

    if (address) {
        venue.address = address
    };
    if (city) {
        venue.city = city
    };
    if (state) {
        venue.state = state
    };
    if (lat) {
        venue.lat = lat
    };
    if (lng) {
        venue.lng = lng
    };

    venue.save();

    venue = venue.toJSON();

    delete venue['updatedAt'];

    res.json(venue);
})


module.exports = router;
