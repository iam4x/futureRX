import test from 'ava'
import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import mount from 'spec/helpers/mount'
import App from 'app/components/app'

chai.use(chaiEnzyme())

test('it should display basic layout', () => {
  const { wrapper } = mount(App)
  expect(wrapper.find('.navbar-brand')).to.exist
  expect(wrapper.find('.navbar-right')).to.exist
})

test('it should render child', () => {
  const { wrapper } = mount(App, { children: <h1>Foobar</h1> })
  expect(wrapper.find('h1')).to.exist
  expect(wrapper.find('h1')).to.have.text('Foobar')
})
