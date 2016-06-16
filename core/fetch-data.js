import { isFunction } from 'lodash'

export default async (store, { components, params, location: { query } }) =>
  await Promise.all(
    components
      .filter(c => isFunction(c.fetchData))
      .map(c => c.fetchData(store, params, query))
  )
