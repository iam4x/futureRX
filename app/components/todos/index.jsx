import React from 'react'
import { Link } from 'react-router'

import connect from 'core/connect'
import { load } from 'app/actions/todos'

import Todo from './todo'

type Props = {
  todos: {
    map: Function
  }
}

const Todos = connect('todos')(({ todos }: Props) =>
  <div>
    <ul className='app--todos'>
      { todos.map((todo, idx) =>
        <Todo key={ idx } todo={ todo } />) }
    </ul>

    <Link to='/asdasd'>Nowhere</Link>
  </div>
)

Todos.fetchData = load

export default Todos
