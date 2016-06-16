import React from 'react'
import { Link } from 'react-router'

import connect from 'core/connect'
import { load } from 'app/actions/todos'

import Todo from './todo'
import CreateTodo from './create'

type Props = {
  todos: {
    map: Function
  }
}

const Todos = ({ todos }: Props) =>
  <div>
    <ul className='app--todos'>
      { todos.map(todo =>
        <Todo
          key={ todo.id }
          todo={ todo }
          onRemove={ () => todos.remove(todo) } />) }
    </ul>

    <CreateTodo />

    <Link to='/404'>404</Link>
  </div>

Todos.fetchData = load

export default connect('todos')(Todos)
