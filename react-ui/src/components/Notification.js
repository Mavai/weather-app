import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  return (
    <Message positive hidden={!notification}>
      <Message.Header>{notification}</Message.Header>
    </Message>
  )
}

export default Notification