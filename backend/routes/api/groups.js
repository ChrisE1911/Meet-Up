const express = require('express');

const { Group, GroupImage, Membership } = require('../../db/models');

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




module.exports = router;
