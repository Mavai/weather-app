const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../utils/config')

const url = config.mongoUrl

mongoose.connect(url)

const locationSchema = new Schema({
  name: String,
  coordinates: [Number],
  observations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }]
})

locationSchema.statics.format = function(location) {
  return {
    name: location.name,
    coordinates: location.coordinates,
    observations: location.observations,
    id: location._id
  }
}

const Location = mongoose.model('Location', locationSchema)

module.exports = Location