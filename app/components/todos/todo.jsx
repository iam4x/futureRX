import React from 'react'
import { observer } from 'mobx-react'

type Props = {
  todo: {
    id: number;
    title: string;
    finished: boolean;
    toggleState: Function;
  };
};

const Todo = observer(({ todo }: Props) =>
  <li>
    { todo.title }
    <input
      type='checkbox'
      checked={ todo.finished }
      onChange={ todo.toggleState } />
  </li>
)

export default Todo
