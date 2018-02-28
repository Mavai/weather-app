import React from 'react'
import { Transition, Container } from 'semantic-ui-react'
import LocationSegment from './LocationSegment'

const LocationList = ({ state, handleClick }) => {
  const { showMainPage, locations } = state
  return (
    <Transition visible={showMainPage} animation='scale' duration={{ hide: 0, show: 500 }}>
      <Container>
        {locations.map(location =>
          <LocationSegment key={location.name} location={location} handleClick={handleClick(location)}/>
        )}
      </Container>
    </Transition>
  )
}

export default LocationList