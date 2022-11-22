'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    return queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: 'image1.png',
        preview: true
      },
      {
        eventId: 2,
        url: 'image2.png',
        preview: true
      },
      {
        eventId: 3,
        url: 'image3.png',
        preview: true
      },
      {
        eventId: 4,
        url: 'image4.png',
        preview: true
      },
      {
        eventId: 5,
        url: 'image5.png',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png',] }
    }, {});
  }
};
