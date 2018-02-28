const locationsRouter = require('express').Router()
const Location = require('../models/location')

locationsRouter.get('/', async (request, response) => {
  const locations = await Location
    .find({})
    .populate('observations', { temperature: 1, dateTime: 1 })

  response.json(locations.map(Location.format))
})

module.exports = locationsRouter