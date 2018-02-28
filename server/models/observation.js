const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../utils/config')

const url = config.mongoUrl

mongoose.connect(url)

const observationSchema = new Schema({
  temperature: Number,
  dateTime: Date,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
})

observationSchema.statics.format = function(observation) {
  return {
    temperature: observation.temperature,
    dateTime: observation.dateTime,
    location: observation.location,
    id: observation._id
  }
}

const Observation = mongoose.model('Observation', observationSchema)

module.exports = Observation