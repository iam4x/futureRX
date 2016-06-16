import React, { Component } from 'react'
import connect from 'core/connect'

@connect('todos')
class CreateTodo extends Component {

  props: {
    todos: {
      push: Function
    }
  }

  state = { title: '' }

  handleChange = ({ target: { value } }) => {
    this.setState({ title: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // fire `onSubmit` with new Todo
    const { title } = this.state
    const { todos } = this.props
    todos.push({ title, id: Math.random(), finished: false })

    // reset title to empty string for next todo
    this.setState({ title: '' })
  }

  render() {
    const { title } = this.state

    return (
      <form
        className='form-group'
        onSubmit={ this.handleSubmit }>
        <input
          type='text'
          value={ title }
          onChange={ this.handleChange } />

        <button disabled={ !(title && title.trim()) }>
          add todo
        </button>
      </form>
    )
  }

}

export default CreateTodo
