import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import locationsService from './services/locations'
import LocationList from './components/LocationList'
import LocationPage from './components/LocationPage'
import Menubar from './components/Menubar'
import ObservationForm from './components/ObservationsForm'
import moment from 'moment'
import observationsService from './services/observations'
import Notification from './components/Notification'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      observations: [],
      locations: [],
      showMainPage: true,
      currentLocation: null,
      location: '',
      temperature: 0,
      date: moment().format(moment.HTML5_FMT.DATE),
      time: moment().format(moment.HTML5_FMT.TIME),
      errors: [],
      column: null,
      direction: null,
      currentPage: 1,
      pageSize: 5,
      notification: null
    }
    this.observationForm = null
    this.menu = null
  }

  componentDidMount = async () => {
    let locations = await locationsService.getAll()
    locations = locations.sort((a, b) => a.name.localeCompare(b.name))
    this.setState({ locations })
  }

  switchPage = (location) => () => {
    this.setState({ showMainPage: !this.state.showMainPage, currentLocation: location, currentPage: 1 })
  }

  toggleMainPage = () => {
    this.setState({ showMainPage: true, currentLocation: null })
  }

  openForm = () => {
    if (this.observationForm.state.visible) return
    this.observationForm.toggleVisible()
    this.setState({ errors: [] })
    window.scrollTo(0, 0)
  }

  handleInputChange = (event, data) => {
    if (data) this.setState({ [data.name]: data.value })
    else this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const  { temperature, date, time, location } = this.state
    const formData = { temperature, date, time, location }
    const observation = await this.validate(formData)
    if (observation) {
      const newObservation = await observationsService.create(observation)
      const location = this.state.locations.find(location => location.id === newObservation.location)
      const locationIndex = this.state.locations.indexOf(location)
      location.observations.push(newObservation)
      let locations = [...this.state.locations]
      locations.splice(locationIndex, 1, location)
      this.setState({ locations, notification: 'New observation added!' })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
      this.observationForm.toggleVisible()
    }
  }

  parseObservation = (formData) => {
    const location = this.state.locations.find(location => location.name === this.state.location)
    return {
      temperature: formData.temperature,
      dateTime: new Date(Date.parse(`${this.state.date} ${this.state.time}`)).toISOString(),
      location: location.id
    }
  }

  validate = (formData) => {
    let errors = []
    if (!this.state.locations.find(location => location.name === formData.location))
      errors.push('Invalid location')
    try {
      new Date(Date.parse(`${this.state.date} ${this.state.time}`)).toISOString()
    } catch(exception) {
      errors.push('Invalid date or time')
    }
    this.setState({ errors })
    if (errors.length === 0) return this.parseObservation(formData)
    return null
  }

  handleSort = (clickedColumn) => () => {
    const { currentLocation, column, direction } = this.state
    const compare = (column) => {
      if (column === 'temperature') return  (a, b) => b[column] - a[column]
      if (column === 'dateTime') return (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    }
    const location = { ...currentLocation }
    if (clickedColumn !== column) {
      location.observations = currentLocation.observations.sort(compare(clickedColumn))
      this.setState({
        column: clickedColumn,
        currentLocation: location,
        direction: 'ascending'
      })
      return
    }
    location.observations = currentLocation.observations.reverse()
    this.setState({
      currentLocation: location,
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  handlePageChange = (event, data) => {
    let currentPage = 1
    if (data.name === 'previous') currentPage = this.state.currentPage - 1
    else if (data.name === 'next') currentPage = this.state.currentPage + 1
    else currentPage = Number(data.name)
    this.setState({ currentPage })
  }

  render() {

    return (
      <Container>
        <Menubar handleMainClick={this.toggleMainPage} handleNewClick={this.openForm}/>
        <Container style={{ marginTop: '5em' }}>
          <Notification notification={this.state.notification}/>
          <ObservationForm
            state={this.state}
            handleChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            ref={component => this.observationForm = component}
          />
          <LocationList state={this.state} handleClick={this.switchPage}/>
          <LocationPage
            state={this.state}
            visible={this.state.showMainPage}
            handleClick={this.switchPage(null)}
            handleSort={this.handleSort}
            handlePageChange={this.handlePageChange}
          />
        </Container>
      </Container>
    )
  }
}

export default App
