const observationsRouter = require('express').Router()
const Observation = require('../models/observation')
const Location = require('../models/location')

observationsRouter.get('/', async (request, response) => {
  const observations = await Observation
    .find({})
    .populate('location', { name: 1, coordinates: 1 })
  response.json(observations.map(Observation.format))
})

observationsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const location = await Location.findById(body.location)

    if(!location) return response.status(400).end()

    const observation = new Observation({
      ...body
    })

    const savedObservation = await observation.save()

    location.observations = location.observations.concat(observation._id)
    await location.save()

    response.status(201).json(Observation.format(savedObservation))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})


module.exports = observationsRouter