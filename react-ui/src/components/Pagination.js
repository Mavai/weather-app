import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const Pagination = ({ currentPage, handlePageChange, pageCount }) => {

  let pages = []
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= pageCount) pages.push(i)
  }

  return (
    <Menu floated='right' pagination>
      <Menu.Item name='previous' disabled={currentPage === 1} as='a' onClick={handlePageChange} icon>
        <Icon name='left chevron' />
      </Menu.Item>
      {pages.map(pageNumber =>
        <Menu.Item
          key={pageNumber}
          as='a'
          name={pageNumber + ''}
          active={pageNumber === currentPage}
          onClick={handlePageChange}
        >{pageNumber}</Menu.Item>
      )}
      <Menu.Item name='next' disabled={currentPage >= pageCount} as='a' onClick={handlePageChange} icon>
        <Icon name='right chevron' />
      </Menu.Item>
    </Menu>
  )
}

export default Pagination