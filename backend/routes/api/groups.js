const express = require('express');

const { Group, GroupImage } = require('../../db/models');

const sequelize = require('sequelize')

const router = express.Router();


//GET ALL GROUPS

router.get('/', async (req, res, next) => {
    const groups = await Group.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn('COUNT', sequelize.col('id')), 'numMembers'
                ]
            ]
        }
    });


    res.json(groups)

    //preview image needs to be added
    //find out why one group is being returned instead of all
})



module.exports = router;
