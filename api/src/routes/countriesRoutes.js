const express = require('express')
const Countries = require('../models/Country')
const getCountries = require('../controllers/index')

const app = express();

app.get('/name', async (req, res) => {
    const { qname } = req.query;
    console.log(qname)
    try {
        if(!qname) throw new Error(`There isn't a valid name`)
        const chosenCountry = await Countries.findOne({
            where: {
                name: qname
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
        console.log(typeof(newCountries))
        var oldCountries = await Countries.findAll()
        if(!oldCountries){
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


module.exports = app;