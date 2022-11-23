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

        newArr.push(group)
    }

    res.json({
        Groups: newArr
    })
});

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

router.post('/:groupId/images', requireAuth, async (req, res, next) => {

    const currentGroup = await Group.findByPk(req.params.groupId);
    const { preview, url } = req.body;
    const newImage = await currentGroup.createGroupImage({
        url,
        preview
    })
    res.json(newImage)
})


module.exports = router;
