import test from 'ava'

import createStore from 'app/store'
import { dehydrate, rehydrate } from 'core/hydrate'

test('it should dehydrate store data', t => {
  const store = createStore({ todos: [ { title: 'foo' } ] })
  const json = dehydrate(store)
  t.is(json, '{"todos":[{"title":"foo"}]}')
})

test('it should rehydrate store data', t => {
  const store = createStore()

  window.__appState__ = JSON.parse('{"todos":[{"title":"foo"}]}')
  rehydrate(store)

  const [ todo ] = store('todos')
  t.is(todo.title, 'foo')
})
