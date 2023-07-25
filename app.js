const express = require('express')
const cars = require('./cars')
const app = express()
const cors = require('cors')
const logger = require('./logger')


//MIDDLEWARE
app.use(cors())
app.use(logger)
app.use(express.json())


app.get('/cars', (req, res) => {
    res.send(cars)
})

app.get('/cars/:id', (req, res) => {
    const idx = req.params.id
    const cars = cars[idx-1]

    if (!cars) {
        res.status(404).json({message: `Car with id ${idx} not found`})
    } else {
        res.send(cars)
    }
})

// create action
app.post('/cars' ,(req, res) => {
    console.log("line 42", req.body)
    const createdCars = req.body

    cars.push(createdCars)
    res.status(201).send(createdCars)
    })


//PATCH

app.patch('/cars/:id', (req, res) => {
    const idx2 = req.params.id
    const searchIndex = cars.findIndex(i => i.id === idx2)
    if (!searchIndex) {
        res.status(404).json({message: `Car with id ${idx2} not found`})
    }

    const updateCars = {...cars[searchIndex], ...req.body}
    cars[cars] = updateCars
    return res.send(updateCars)
})

module.exports = app