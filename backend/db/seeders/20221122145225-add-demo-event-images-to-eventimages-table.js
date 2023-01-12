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
        url: 'https://pikwizard.com/photos/2469a7bfd623afbe3536bcfd411245ce-m.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://static.businessworld.in/article/article_extra_large_image/1598015126_YvTjER_banquet_hall.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://embed.widencdn.net/img/veritas/peirxsbt7a/1200x630px/golf-ball-putting-range.jpeg',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://i.pinimg.com/originals/04/4b/aa/044baaf2eb8b3041ce6adec6c99226de.jpg',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
