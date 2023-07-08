const express = require('express')
const Countries = require('../models/Country')
const Activities = require('../models/Activity')
const getCountries = require('../controllers/index')
const { Op } = require("sequelize");

const app = express();

app.get('/name', async (req, res) => {
    const { qname, qcontinent } = req.query;
    var newName
    if(qname){
        newName = qname[0].toUpperCase() + qname.substring(1).toLowerCase()
    }
    try {
        if(!qname && !qcontinent) {
            const allCountries = await Countries.findAll({
                include: {
                    model: Activities
                }
            })
            return res.status(200).json({
                'country': allCountries
            })
        }
        if(qname && !qcontinent){
            const chosenCountry = await Countries.findAll({
                where: {
                    name: {
                        [Op.or]: {
                            [Op.substring]: newName,
                            [Op.substring]: qname,
                            [Op.startsWith]: qname,
                            [Op.startsWith]: newName,
                            [Op.endsWith]: qname,
                            [Op.endsWith]: newName
                        }
                    }
                },
                include: {
                    model: Activities
                }
            })
            if(!chosenCountry) throw new Error('There is not a valid name')
            return res.status(200).json({
                'country': chosenCountry
            })
        }else if(!qname && qcontinent) {
            const oldCountries = await Countries.findAll({
                where: {
                    continent: qcontinent
                },
                include: {
                    model: Activities
                }
            })
            if(!oldCountries) throw new Error('There is not a valid input for a continent')
            return res.status(200).json({
                'country': oldCountries
            })
        }
        const countryTwoFiltered = await Countries.findAll({
            where: {
                name: {
                    [Op.or]: {
                        [Op.substring]: newName,
                        [Op.substring]: qname,
                        [Op.startsWith]: qname,
                        [Op.startsWith]: newName,
                        [Op.endsWith]: qname,
                        [Op.endsWith]: newName
                    }
                },
                continent: qcontinent
            },
            include: {
                model: Activities
            }
        })
        return res.status(200).json({
            'country': countryTwoFiltered
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/:idCountry', async (req, res) => {
    const { idCountry } = req.params
    try {
        if(!idCountry) throw new Error('There is no id valid')
        const chosenId = await Countries.findOne({
            where: {
                id: idCountry
            },
            include: {
                model: Activities
            }
        })    
        if(!chosenId) throw new Error('There is no id valid')
        return res.status(200).json({
            'country': chosenId
        })    
    } catch (error) {
        console.log(error)
    }    
})    

app.get('/', async (req, res)=>{
    try {
        const newCountries = await getCountries()
        var oldCountries = await Countries.findAll({
            include: {
                model: Activities
            }
        })
        if(oldCountries.length === 0){
            oldCountries = await Countries.bulkCreate(newCountries);
        }
        return res.status(200).json({
            "Countries": oldCountries
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'msg': 'There is a problem with the countries list'
        })
    }
})

app.post('/', async (req, res) => {
    const { name, flag, continent, capital, subregion, area, population } = req.body
    try {
        if(!name || !flag || !continent || !capital || !subregion || !area || !population) throw new Error('There is not all the information I need')
        const oldCountry = await Countries.findOne({
            where: {
                name: name,
                flag: flag,
                continent: continent,
                capital: capital,
                subregion: subregion,
                area: area,
                population: population
            }
        })
        if(oldCountry) throw new Error('This activity is already registered')
        const newCountry = await Countries.create({
            name: name,
            flag: flag,
            continent: continent,
            capital: capital,
            subregion: subregion,
            area: area,
            population: population
        })
        return res.status(200).json({
            'contry': newCountry
        })
    } catch (error) {
        console.log(error)    
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        if(!id) throw new Error('There is not all the information I need')
        const oldCountry = await Countries.findOne({
            where: {
                id: id
            }
        })
        if(!oldCountry) throw new Error('There is not all the information I need')
        await Countries.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            'The activity was deleted succesfully': oldCountry
        })
    } catch (error) {
        console.log(error)
    }
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, flag, continent, capital, subregion, area, population } = req.body
    try {
        if(!id || !name || !flag || !continent || !capital || !subregion || !area || !population) throw new Error('There is not all the information I need')
        const numberId = parseInt(id) 
        const oldCountry = await Countries.findOne({
            where: {
                id: numberId
            }
        })
        if(!oldCountry) throw new Error('There is not all the information I need')
        await Countries.update({
            name: name,
            flag: flag,
            continent: continent,
            capital: capital,
            subregion: subregion,
            area: area,
            population: population
        },{
            where: {
                id: numberId
            }
        })
        const newCountry = await Countries.findOne({
            where: {
                id: numberId
            }
        })
        return res.status(200).json({
            'The country was updated succesfully': newCountry
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = app;