import { memoize } from 'lodash'

import React from 'react'
import connect from 'core/connect'

import styles from 'app/styles/todos.css'

type Props = {
  todo: {
    id: number,
    title: string,
    finished: boolean
  }
}

const handleClick = memoize((todo) => () => { todo.finished = true })

const PendingTodo = ({ todo }: Props) =>
  <li
    className={ styles.pendingTodo }
    onClick={ handleClick(todo) }>
    <input
      type='checkbox'
      checked={ todo.finished }
      onChange={ handleClick(todo) } />

    { todo.title }
  </li>

export default connect()(PendingTodo)
