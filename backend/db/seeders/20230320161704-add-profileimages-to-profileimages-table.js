'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ProfileImages';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
         url: 'https://americanprofile.com/wp-content/uploads/2007/04/running_across_america.jpg',
        preview: true
      },
      {
        userId: 2,
        url: 'http://www.assemblyltd.com/media/cache/22/be/22be9ec00ec5a962ef597398ce06154d.jpg',
        preview: true
      },
      {
        userId: 3,
        url: 'https://www.slideteam.net/media/catalog/product/cache/960x720/1/1/1114_red_3d_man_running_fast_for_victory_stock_photo_Slide01.jpg',
        preview: true
      },
      {
        userId: 4,
        url: 'https://clipartmag.com/images/people-running-images-50.jpg',
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProfileImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
