const { DataTypes } = require('sequelize');
const sequelize = require('../database/database')

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dificculty: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER
  },
  season: {
    type: DataTypes.STRING,
    fields: ['Summer', 'Autumn', 'Winter', 'Spring']
  }
});

module.exports = Activity;