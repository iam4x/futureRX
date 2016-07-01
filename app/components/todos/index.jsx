import { filter } from 'lodash'

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import connect from 'core/connect'
import { load } from 'app/actions/todos'

import FinishedTodo from './finished-todo'
import PendingTodo from './pending-todo'
import CreateTodo from './create'

import styles from 'app/styles/todos.css'

type Props = {
  todos: {
    map: Function
  }
}

const Todos = ({ todos }: Props) =>
  <div className='row'>
    { /* unfinished todos */ }
    <div className='col-sm-6'>
      <div className={ styles.todosContainer }>
        <h1 className='text-center'>Todos</h1>

        <CreateTodo />

        <ul className={ styles.todosList }>
          { filter(todos, { finished: false }).map(todo =>
            <PendingTodo
              key={ todo.id }
              todo={ todo } />) }
        </ul>
      </div>
    </div>

    { /* finished todos */ }
    <div className='col-sm-6'>
      <div className={ styles.todosContainer }>
        <h1 className='text-center'>Already done</h1>

        <ul className={ styles.todosList }>
          { filter(todos, { finished: true }).map(todo =>
            <FinishedTodo
              key={ todo.id }
              todo={ todo }
              onRemove={ () => todos.remove(todo) } />) }
        </ul>
      </div>
    </div>
  </div>


export default Object.assign(
  withStyles(styles)(connect('todos')(Todos)),
  { fetchData: load }
)
