const express = require('express')
const activities = require('./activitiesRoutes')
const countries = require('./countriesRoutes')

const app = express();

app.use('/activities', activities)
app.use('/countries', countries)

module.exports = app;