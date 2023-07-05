const express = require('express')
const Countries = require('../models/Country')
const getCountries = require('../controllers/index')

const app = express();

app.get('/name', async (req, res) => {
    const { qname } = req.query;
    try {
        if(!qname) throw new Error(`There is not a valid name`)
        const newName = qname[0].toUpperCase() + qname.substring(1).toLowerCase()
        const chosenCountry = await Countries.findOne({
            where: {
                name: newName
            }
        })
        if(!chosenCountry) throw new Error(`There isn't a valid name`)
        return res.status(200).json({
            'country': chosenCountry
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
        var oldCountries = await Countries.findAll()
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