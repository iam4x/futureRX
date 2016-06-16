import React from 'react'
import connect from 'core/connect'

type Props = {
  todo: {
    id: number,
    title: string,
    finished: boolean
  },
  onRemove: Function
}

const Todo = ({ todo, onRemove }: Props) =>
  <li>
    { todo.title }
    <input
      type='checkbox'
      checked={ todo.finished }
      onChange={ () => { todo.finished = !todo.finished } } />

    <button
      type='button'
      onClick={ () => onRemove(todo) }>
      remove
    </button>
  </li>

export default connect()(Todo)
