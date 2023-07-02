const {Activity} = require('./Activity')
const {Country} = require('./Country')

Country.belongsToMany(Activity,{through:'countryActivity'})
Activity.belongsToMany(Country,{through:'countryActivity'})