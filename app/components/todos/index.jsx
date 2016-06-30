import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'

import connect from 'core/connect'
import { load } from 'app/actions/todos'

import Todo from './todo'
import CreateTodo from './create'

import styles from './todos.css'

type Props = {
  todos: {
    map: Function
  }
}

const Todos = ({ todos }: Props) =>
  <div className={ styles.root }>
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

export default Object.assign(
  withStyles(styles)(connect('todos')(Todos)),
  { fetchData: load }
)
