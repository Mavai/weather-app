const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const locationsRouter = require('./controllers/locations')
const observationsRouter = require('./controllers/observations')
const config = require('./utils/config')
const path = require('path')

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

app.use(cors())
app.use(bodyParser.json())
app.use('/api/locations', locationsRouter)
app.use('/api/observations', observationsRouter)

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
