import React from 'react'
import { mount } from 'enzyme'
import LocationSegment from './LocationSegment'

describe('<LocationSegment />', () => {
  it('renders content', () => {
    const location = {
      name: 'Test',
      observations: []
    }

    const locationSegmentComponent = mount(<LocationSegment location={location}/>)
    const segment = locationSegmentComponent.find('h2.locationName')
    expect(segment.text()).toContain(location.name)
  })

  it('renders correct current temperature', () => {
    const location = {
      name: 'Test',
      observations: [
        {
          temperature: 30,
          dateTime: new Date()
        },
        {
          temperature: -15,
          dateTime: new Date() - 10
        }
      ]
    }

    const locationSegmentComponent = mount(<LocationSegment location={location}/>)
    const segment = locationSegmentComponent.find('div.currentTemperature')
    expect(segment.text()).toContain(30)
  })

  it('renders correct highest temperature', () => {
    const location = {
      name: 'Test',
      observations: [
        {
          temperature: 30,
          dateTime: new Date()
        },
        {
          temperature: -15,
          dateTime: new Date() - 10
        }
      ]
    }

    const locationSegmentComponent = mount(<LocationSegment location={location}/>)
    const segment = locationSegmentComponent.find('div.highestTemperature')
    expect(segment.text()).toContain(30)
  })

  it('renders correct lowest temperature', () => {
    const location = {
      name: 'Test',
      observations: [
        {
          temperature: 30,
          dateTime: new Date()
        },
        {
          temperature: -15,
          dateTime: new Date() - 10
        }
      ]
    }

    const locationSegmentComponent = mount(<LocationSegment location={location}/>)
    const segment = locationSegmentComponent.find('div.lowestTemperature')
    expect(segment.text()).toContain(-15)
  })

  it('doesn\'t render highest from more than 24 hours ago', () => {
    const location = {
      name: 'Test',
      observations: [
        {
          temperature: 30,
          dateTime: new Date() - (25 * 60 * 60 * 1000)
        }
      ]
    }

    const locationSegmentComponent = mount(<LocationSegment location={location}/>)
    const segment = locationSegmentComponent.find('div.highestTemperature')
    expect(segment.text()).not.toContain(30)
  })

  it('doesn\'t render lowest from more than 24 hours ago', () => {
    const location = {
      name: 'Test',
      observations: [
        {
          temperature: 30,
          dateTime: new Date() - (25 * 60 * 60 * 1000)
        }
      ]
    }

    const locationSegmentComponent = mount(<LocationSegment location={location}/>)
    const segment = locationSegmentComponent.find('div.lowestTemperature')
    expect(segment.text()).not.toContain(30)
  })
})

