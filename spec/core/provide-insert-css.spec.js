import { noop } from 'lodash'

import test from 'ava'
import React, { PropTypes } from 'react'
import { mount } from 'enzyme'

import ProvideInsertCss from 'core/provide-insert-css'

const App = () => <h1>Foobar</h1>
App.contextTypes = { insertCss: PropTypes.func.isRequired }

const Example = () =>
  <ProvideInsertCss insertCss={ noop }>
    <App />
  </ProvideInsertCss>

test('it should provide `insertCss` function through context', t => {
  const wrapper = mount(<Example />)
  t.is(wrapper.find('App').node.context.insertCss, noop)
})
