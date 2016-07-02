import { filter } from 'lodash'
import pluralize from 'pluralize'

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

const handleMarkAllDone = (todos) => () =>
  todos.replace(todos.map(t => ({ ...t, finished: true })))

const Todos = ({ todos }: Props) => {
  const pendingTodos = filter(todos, { finished: false })
  const finishedTodos = filter(todos, { finished: true })

  return (
    <div className='row'>
      { /* unfinished todos */ }
      <div className='col-sm-6'>
        <div className={ styles.todosContainer }>
          <h1 className='text-center'>Todos</h1>

          <CreateTodo />

          <div className='form-group'>
            <div
              className='btn btn-block btn-sm btn-success'
              onClick={ handleMarkAllDone(todos) }>
              Mark all done
            </div>
          </div>

          <ul className={ styles.todosList }>
            { pendingTodos.map(todo =>
              <PendingTodo
                key={ todo.id }
                todo={ todo } />) }
          </ul>

          <div className={ styles.count }>
            { pendingTodos.length ?
              <span>
                <strong>{ pendingTodos.length }</strong>
                <span> { pluralize('todo', pendingTodos.length) } remaining</span>
              </span> :
              <span>Congrats it's all done!</span> }
          </div>
        </div>
      </div>

      { /* finished todos */ }
      <div className='col-sm-6'>
        <div className={ styles.todosContainer }>
          <h1 className='text-center'>Already done</h1>

          <ul className={ styles.todosList }>
            { finishedTodos.map(todo =>
              <FinishedTodo
                key={ todo.id }
                todo={ todo }
                onRemove={ () => todos.remove(todo) } />) }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Object.assign(
  withStyles(styles)(connect('todos')(Todos)),
  { fetchData: load }
)
