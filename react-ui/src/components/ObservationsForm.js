import React from 'react'
import { Form, Segment, Input, Transition, Button, Message } from 'semantic-ui-react'

class ObservationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisible = (event) => {
    if (event) event.preventDefault()
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { state, handleChange, handleSubmit } = this.props
    const dropdownLocations = state.locations.map(location => ({ key: location.id, text: location.name, value: location.name }))

    return (
      <Transition visible={this.state.visible} animation='slide down' duration={{ hide: 500, show: 500 }}>
        <Segment>
          <Form error onSubmit={handleSubmit}>
            <Message
              hidden={state.errors.length === 0}
              error={state.errors.length !== 0}
              header='Invalid input'
              list={state.errors}
            />
            <Form.Group>
              <Form.Select
                width={8}
                label='Location'
                name='location'
                placeholder='Location'
                options={dropdownLocations}
                onChange={handleChange}
              />
              <Form.Field width={8}>
                <label>Temperature</label>
                <Input name='temperature' type='number' label='&#8451;' labelPosition='right' value={state.temperature} onChange={handleChange}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={8} control='input' type='date' label='Date' name='date' value={state.date} onChange={handleChange}/>
              <Form.Field width={8} control='input' type='time' label='Time' name='time' value={state.time} onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Button primary content='Submit'/>
              <Button secondary onClick={this.toggleVisible}>Cancel</Button>
            </Form.Group>
          </Form>
        </Segment>
      </Transition>
    )
  }
}

export default ObservationForm