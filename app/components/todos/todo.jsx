import React from 'react'
import { observer } from 'mobx-react'

import { toggle } from 'app/actions/todos'

type Props = {
  todo: {
    id: number,
    title: string,
    finished: boolean
  }
}

const Todo = observer(({ todo }: Props) =>
  <li>
    { todo.title }
    <input
      type='checkbox'
      checked={ todo.finished }
      onChange={ () => toggle(todo) } />
  </li>
)

export default Todo
