import isFunction from 'lodash/isFunction'

export default async (stores, { components, params, location: { query } }) =>
  await Promise.all(
    components
      .filter(c => isFunction(c.fetchData))
      .map(c => c.fetchData(stores, params, query))
  )
