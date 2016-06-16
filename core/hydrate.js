import each from 'lodash/each'
import isFunction from 'lodash/isFunction'

import jsonStringifySafe from 'json-stringify-safe'
import { toJS } from 'mobx'

export const dehydrate = (stores) => jsonStringifySafe(toJS(stores))

export const rehydrate = (stores) => each(
  stores,
  (store, storeName) => {
    const data = window.__appState__[storeName]

    // if the store implement a specific method called `rehydrate`
    // we're going to pass the `appState` data through it
    isFunction(store.rehydrate) ?
      store.rehydrate(data) : Object.assign(store, data)
  }
)
