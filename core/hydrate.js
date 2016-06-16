import { each } from 'lodash'
import jsonStringifySafe from 'json-stringify-safe'

export const dehydrate = (store) => jsonStringifySafe(store.contents())

export const rehydrate = (store) => each(
  window.__appState__,
  (data, storeKey) => store.set(storeKey, data)
)
