const { DataTypes } = require('sequelize');
const sequelize = require('../database/database')

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  flag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  continent: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capital: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subregion: {
    type: DataTypes.STRING
  },
  area: {
    type: DataTypes.FLOAT
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Country;