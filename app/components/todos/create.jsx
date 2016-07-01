import React, { Component } from 'react'
import { observable } from 'mobx'

import connect from 'core/connect'

@connect('todos')
class CreateTodo extends Component {

  props: {
    todos: {
      push: Function
    }
  }

  @observable title = ''

  handleChange = ({ target: { value } }) => {
    this.title = value
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { title } = this
    const { todos } = this.props

    if (title && title.trim()) {
      // fire `onSubmit` with new Todo
      todos.push({ title, id: Math.random(), finished: false })

      // reset title to empty string for next todo
      this.title = ''
    }
  }

  render() {
    const { title } = this

    return (
      <form
        className='form-group'
        onSubmit={ this.handleSubmit }>
        <input
          type='text'
          value={ title }
          className='form-control'
          onChange={ this.handleChange }
          placeholder='Add todo' />
      </form>
    )
  }

}

export default CreateTodo
