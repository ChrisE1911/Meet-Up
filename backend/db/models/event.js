'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.EventImage, { foreignKey: 'eventId', onDelete: 'CASCADE', hooks: true});
      Event.hasMany(models.Attendance, { foreignKey: 'eventId', onDelete: 'CASCADE', hooks: true});
      Event.belongsTo(models.Venue, { foreignKey: 'venueId' });
      Event.belongsTo(models.Group, {foreignKey: 'groupId'});
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,265]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Online', 'In Person']]
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
      validate: {
        tooLowPrice(value) {
          if (value <= 5) {
            throw new Error('Price is too low. Please enter amount greater than 5')
          }
        }
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: "2022-11-19"
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        afterStartDate(value) {
          if (value < this.startDate) {
            throw new Error('End Date must be after Start Date')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
