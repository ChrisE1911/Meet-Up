'use strict';

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        picture_url: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
      },
      {
        firstName: 'John',
        lastName: 'Wick',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        picture_url: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
      },
      {
        firstName: 'Max',
        lastName: 'Maximus',
        email: 'max2@maximus.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        picture_url: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
      },
      {
        firstName: 'Raven',
        lastName: 'Rave',
        email: 'rave2@raven.io',
        username: 'Rave-Raven3',
        hashedPassword: bcrypt.hashSync('password4'),
        picture_url: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
      },
      {
        firstName: 'Angelena',
        lastName: 'Cole',
        email: 'cole@angelena.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password5'),
        picture_url: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Rave-Raven3', 'FakeUser3'] }
    }, {});
  }
};
