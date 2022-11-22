'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    return queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: '123 Cool Drive',
        city: 'High Point',
        state: 'NC',
        lat: -85.625,
        lng: -150.453
      },
      {
        groupId: 2,
        address: '456 Main Street',
        city: 'Charlotte',
        state: 'NC',
        lat: -82.615,
        lng: -148.253
      },
      {
        groupId: 3,
        address: '789 Cole Drive',
        city: 'Fayettville',
        state: 'NC',
        lat: -80.252,
        lng: -130.713
      },
      {
        groupId: 4,
        address: '1000 Ford Street',
        city: 'Winston-Salem',
        state: 'NC',
        lat: -79.615,
        lng: -110.413
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
