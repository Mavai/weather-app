import React from 'react'
import { Card, Grid, Header, Divider } from 'semantic-ui-react'
import moment from 'moment'

class LocationSegment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      raised: false
    }
  }

  render() {
    const { handleClick, location } = this.props

    return (
      <Card key={location.name} onClick={handleClick} fluid>
        <Card.Content>
          <Card.Header>
            <Header as='h2' className='locationName'>{location.name}</Header>
          </Card.Header>
          <Card.Meta>
            Latest observation: {latestObservation(location).dateTime}
          </Card.Meta>
          <Card.Description>
            <Divider/>
            <Grid columns={3}>
              <Grid.Column className='currentTemperature'>
                Temperature: {latestObservation(location).temperature}
                {(latestObservation(location).temperature !== '') && <span> &#8451;</span>}
              </Grid.Column>
              <Grid.Column className='highestTemperature'>
                Highest in 24 hours: {highestLastDay(location)}
                {(highestLastDay(location) !== '') && <span> &#8451;</span>}
              </Grid.Column>
              <Grid.Column className='lowestTemperature'>
                Lowest in 24 hours: {lowestLastDay(location)}
                {(lowestLastDay(location) !== '') && <span> &#8451;</span>}
              </Grid.Column>
            </Grid>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const latestObservation = (location) => {
  if (location.observations.length === 0) return { dateTime: '', temperature: '' }
  const latest = location.observations.reduce((latest, current) => latest.dateTime > current.dateTime ? latest : current)
  return { temperature: latest.temperature, dateTime: moment(latest.dateTime).format('DD.MM.YYYY, HH:mm') }
}

const highestLastDay = (location) => {
  if (location.observations.length === 0) return ''
  let highest = ''
  location.observations.forEach(observation => {
    if (((highest === '' || observation.temperature >= highest)) && new Date(observation.dateTime) > new Date() - (24 * 60 * 60 * 1000))
      highest = observation.temperature
  })
  
  return highest
}

const lowestLastDay = (location) => {
  if (location.observations.length === 0) return ''
  let lowest = ''
  location.observations.forEach(observation => {
    if (((lowest === '' || observation.temperature <= lowest)) && new Date(observation.dateTime) > new Date() - (24 * 60 * 60 * 1000))
      lowest = observation.temperature
  })
  return lowest
}

export default LocationSegment