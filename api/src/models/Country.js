const { DataTypes } = require('sequelize');
const sequelize = require('../database/database')

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
  },
  lat: {
    type: DataTypes.FLOAT
  },
  lng: {
    type: DataTypes.FLOAT
  }
});

module.exports = Country;