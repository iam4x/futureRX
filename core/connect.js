import { observer } from 'mobx-react'
import { inject } from 'react-tunnel'

export default (reducer) => (Component) => {
  // * connect() -> return all stores
  // * connect(fn) -> apply fn to stores object
  // * connect('foo') -> provide 'foo' store as props
  const injectStoresIntoProps = inject(({ stores }) => {
    switch (typeof reducer) {
    case 'function':
      return reducer(stores)

    case 'string':
      return ({ [reducer]: stores[reducer] })

    default:
      return ({ stores })
    }
  })

  // * observe decorated component by `mobx-react::observer`
  // * connect props from context onto decorated component
  const finalComponent = injectStoresIntoProps(observer(Component))

  // if we have `fetchData` static property declared on inital component
  // copy it to the final component returned
  if (typeof Component.fetchData === 'function') {
    Object.assign(finalComponent, { fetchData: Component.fetchData })
  }

  return finalComponent
}
