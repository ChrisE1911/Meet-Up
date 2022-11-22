'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    return queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'Blue Runners',
        about: 'Our favorite color is blue and we like to run. Come on in and join us today.',
        type: 'In-Person',
        private: false,
        city: 'High Point',
        state: 'NC'
      },
      {
        organizerId: 2,
        name: 'Green Giants',
        about: 'Our passion is as big as our name. Come join our club and see what Green Giants are all about.',
        type: 'In-Person',
        private: false,
        city: 'Charlotte',
        state: 'NC'
      },
      {
        organizerId: 3,
        name: 'Rojo Rollers',
        about: 'Plenty of events to keep our members rolling. Fill out an application today',
        type: 'In-Person',
        private: true,
        city: 'Winston-Salem',
        state: 'NC'
      },
      {
        organizerId: 4,
        name: 'Rapid Racers',
        about: 'If you love racing, this is the group for you. Come fill out an application and see what we have to offer.',
        type: 'In-Person',
        private: true,
        city: 'Fayetteville',
        state: 'NC'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
