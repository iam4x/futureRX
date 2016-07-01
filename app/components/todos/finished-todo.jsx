import React from 'react'
import connect from 'core/connect'

import styles from 'app/styles/todos.css'

type Props = {
  todo: {
    id: number,
    title: string,
    finished: boolean
  },
  onRemove: Function
}

const FinishedTodo = ({ todo, onRemove }: Props) =>
  <li className={ styles.finishedTodo }>
    { todo.title }

    <div
      className='btn btn-default btn-xs pull-right'
      onClick={ onRemove }>
      <span className='glyphicon glyphicon-remove' />
    </div>
  </li>

export default connect()(FinishedTodo)
