import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

const Menubar = ({ handleMainClick, handleNewClick }) => {
  return (
    <Menu fixed='top' size='massive' inverted>
      <Container>
        <Menu.Item as='a' header onClick={handleMainClick}>
              Weather app
        </Menu.Item>
        <Menu.Item position='right'>
          <Button primary onClick={handleNewClick}>New observation</Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Menubar