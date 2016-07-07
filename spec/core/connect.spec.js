import { noop } from 'lodash'

import test from 'ava'
import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import createStore from 'app/store'
import mount from 'spec/helpers/mount'
import connect from 'core/connect'

chai.use(chaiEnzyme())

const Example = ({ todos }: { todos: any }) =>
  <ul>{ todos.map(({ title }) => <li key={ title }>{ title }</li>) }</ul>

Example.fetchData = noop

const Example2 = ({ store }: { store: any }) =>
  <ul>{ store('todos').map(({ title }) => <li key={ title }>{ title }</li>) }</ul>

const data = { todos: [ { title: 'foo' } ] }

test('it should decorate component', t => {
  const Decorated = connect('todos')(Example)
  t.is(Decorated.displayName, 'connect(Example)')
  t.is(Decorated.fetchData, Example.fetchData)
})

test('it should connect store with store key', () => {
  const store = createStore(data)
  const Decorated = connect('todos')(Example)
  const { wrapper } = mount(Decorated, {}, store)
  expect(wrapper.find('li')).to.exist
  expect(wrapper.find('li')).to.have.text('foo')
})

test('it should connect whole store without params', () => {
  const store = createStore(data)
  const Decorated = connect()(Example2)
  const { wrapper } = mount(Decorated, {}, store)
  expect(wrapper.find('li')).to.exist
  expect(wrapper.find('li')).to.have.text('foo')
})

test('it should connect with an array as params', () => {
  const store = createStore(data)
  const Decorated = connect([ 'todos' ])(Example)
  const { wrapper } = mount(Decorated, {}, store)
  expect(wrapper.find('li')).to.exist
  expect(wrapper.find('li')).to.have.text('foo')
})
