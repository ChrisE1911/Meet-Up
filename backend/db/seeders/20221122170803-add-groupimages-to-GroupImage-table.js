'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: 'groupimage1.png',
        preview: true
      },
      {
        groupId: 2,
        url: 'groupimage2.png',
        preview: false
      },
      {
        groupId: 3,
        url: 'groupimage3.png',
        preview: false
      },
      {
        groupId: 4,
        url: 'groupimage4.png',
        preview: false
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
