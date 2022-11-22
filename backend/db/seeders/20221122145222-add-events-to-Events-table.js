'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Events';
    return queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 1,
        name: "Annual Meet Up",
        description: 'Everyone come out to the mix and mingle and have fun',
        type: 'In-Person',
        capacity: 100,
        price: 10.00,
        startDate: '2022-22-11',
        endDate: '2022-22-11',
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Annual Banquet",
        description: 'Everyone come out to and enjoy great food and great people',
        type: 'In-Person',
        capacity: 200,
        price: 15.00,
        startDate: '2022-23-11',
        endDate: '2022-23-11',
      },
      {
        venueId: 3,
        groupId: 3,
        name: "Annual Golf Tournament",
        description: 'Who will come out victorious? Come on out and swing your way to prizes',
        type: 'In-Person',
        capacity: 100,
        price: 15.00,
        startDate: '2022-25-11',
        endDate: '2022-25-11',
      },
      {
        venueId: 4,
        groupId: 4,
        name: "Thanksgiving Party",
        description: 'Come on out and enjoy great food and great vibes',
        type: 'In-Person',
        capacity: 50,
        price: 5.00,
        startDate: '2022-24-11',
        endDate: '2022-24-11',
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
