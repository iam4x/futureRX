import { noop } from 'lodash'

import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-tunnel'

import createStore from 'app/store'
import ProvideInsertCss from 'core/provide-insert-css'

export default (Component, props = {}, store = createStore()) => {
  const wrapper = mount(
    <Provider provide={ { store } }>
      { () =>
        <ProvideInsertCss insertCss={ noop }>
          <Component { ...props } />
        </ProvideInsertCss> }
    </Provider>
  )
  return { store, wrapper }
}
