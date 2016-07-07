import test from 'ava'

import createStore from 'app/store'
import fetchData from 'core/fetch-data'

const ExampleComponent = {
  fetchData: (store) => new Promise(resolve => {
    setTimeout(() => {
      store('todos').replace([ { title: 'foo' } ])
      resolve()
    }, 100)
  })
}

test('it should resolve `fetchData` promises', async (t) => {
  const store = createStore()
  const components = [ ExampleComponent ]
  await fetchData(store, { components, params: {}, location: { query: '' } })
  t.is(store('todos').length, 1)
  t.is(store('todos')[0].title, 'foo')
})
