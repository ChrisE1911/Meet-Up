'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.GroupImage, { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true});
      Group.hasMany(models.Event, { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true});
      Group.belongsTo(models.User, { foreignKey: 'organizerId' });
      Group.hasMany(models.Membership, { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true });
      Group.hasMany(models.Venue, { foreignKey: 'groupId', onDelete: 'SET NULL', hooks: true });
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,60]
      }
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [50,250]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Online', 'In Person']]
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        emptyString(value) {
          if (value === '') {
            throw new Error("City is required")
          }
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
