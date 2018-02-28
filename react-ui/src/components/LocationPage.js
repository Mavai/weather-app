import React from 'react'
import { Button, Segment, Header, Table, Transition } from 'semantic-ui-react'
import moment from 'moment'
import Pagination from './Pagination'

const LocationPage = ({ state, visible, handleClick, handleSort, handlePageChange }) => {
  const { currentLocation, column, direction, currentPage, pageSize } = state

  const observationsOnPage = (observations) => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const observationsOnPage = observations.slice(startIndex , endIndex)
    return observationsOnPage
  }

  const pageCount = currentLocation && Math.ceil(currentLocation.observations.length / pageSize)
  const observationsToShow = currentLocation && observationsOnPage(currentLocation.observations)

  return (
    <Transition visible={!visible} animation='scale' duration={{ hide: 0, show: 500 }}>
      <Segment>
        <Header as='h1'>
          {currentLocation && currentLocation.name}
        </Header>
        <Table sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={8}
                sorted={column === 'temperature' ? direction : null}
                onClick={handleSort('temperature')}
              >Temeprature</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'dateTime' ? direction : null}
                onClick={handleSort('dateTime')}
              >DateTime</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {observationsToShow && observationsToShow.map(observation =>
              <Table.Row key={observation._id}>
                <Table.Cell>{observation.temperature} &#8451;</Table.Cell>
                <Table.Cell>{moment(observation.dateTime).format('DD.MM.YYYY, HH:mm')}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='2'>
                <Pagination currentPage={currentPage} handlePageChange={handlePageChange} pageCount={pageCount}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Button onClick={handleClick}>Back</Button>
      </Segment>
    </Transition>
  )
}

export default LocationPage