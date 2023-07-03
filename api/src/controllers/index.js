const axios = require('axios').default;
require('dotenv').config()

const getCountriesApi = async () => {
        const countriesApi = await axios.get(process.env.DB_URL)
        const countriesMaped = await countriesApi.data.map(c => {
            const country = {
                name: c.name.official,
                flag: c.flags[1],
                continent: c.continents[0],
                capital: c.capital ? c.capital[0] : 'No data',
                subregion: c.subregion,
                area: c.area,
                population: c.population
            }
            return country
            
        })
            return countriesMaped;
}

module.exports = getCountriesApi;