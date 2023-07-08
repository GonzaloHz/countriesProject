const express = require('express')
const Activities = require('../models/Activity')
const Countries = require('../models/Country')

const app = express();

app.get('/', async (req, res)=>{
    try {
        const allTheActivities = await Activities.findAll({
            include: {
                model: Countries
            }
        })
        if(!allTheActivities) throw new Error('There is no activities loaded')
        return res.status(200).json({
            'activities': allTheActivities
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/', async (req, res) => {
    const { name, dificculty, duration, season, idCountry } = req.body
    try {
        if(!name || !dificculty || !season || !idCountry) throw new Error('There is not all the information I need')
        const oldActivity = await Activities.findOne({
            where: {
                name: name,
                dificculty: dificculty,
                season: season,
                duration: duration
            }
        })
        const countryById = await Countries.findOne({
            where: {
                id: idCountry
            }
        })
        if(!countryById) throw new Error('There is not all the information I need')
        if(oldActivity) throw new Error('This activity is already registered')
        const newActivity = await Activities.create({
            name: name,
            dificculty: dificculty,
            season: season,
            duration: duration
        })
        await newActivity.addCountries(countryById)
        return res.status(200).json({
            'activity': newActivity
        })
    } catch (error) {
        console.log(error)    
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        if(!id) throw new Error('There is not all the information I need')
        const oldActivity = await Activities.findOne({
            where: {
                id: id
            }
        })
        if(!oldActivity) throw new Error('There is not all the information I need')
        await Activities.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            'The activity was deleted succesfully': oldActivity
        })
    } catch (error) {
        console.log(error)
    }
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, dificculty, season, duration } = req.body
    try {
        if(!id || !name || !dificculty || !season || !duration) throw new Error('There is not all the information I need')
        const numberId = parseInt(id) 
        const oldActivity = await Activities.findOne({
            where: {
                id: numberId
            }
        })
        if(!oldActivity) throw new Error('There is not all the information I need')
        const newActivity = await Activities.update({
            name: name,
            dificculty: dificculty,
            season: season,
            duration: duration
        },{
            where: {
                id: numberId
            }
        })
        return res.status(200).json({
            'The activity was updated succesfully': newActivity
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = app;