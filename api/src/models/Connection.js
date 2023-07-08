const Activities = require('./Activity')
const Countries = require('./Country')

Countries.belongsToMany(Activities,{through:'countryActivity'})
Activities.belongsToMany(Countries,{through:'countryActivity'})