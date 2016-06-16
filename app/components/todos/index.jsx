import React from 'react'
import { Link } from 'react-router'

import connect from 'core/connect'

import Todo from './todo'

type Props = {
  todos: {
    collection: {};
  };
};

const Todos = connect('todos')(({ todos: { collection } }: Props) =>
  <div>
    <ul className='app--todos'>
      { collection.map((todo, idx) =>
        <Todo key={ idx } todo={ todo } />) }
    </ul>

    <Link to='/asdasd'>Nowhere</Link>
  </div>
)

Todos.fetchData = async ({ todos }) => await todos.load()

export default Todos
