import { isArray } from 'lodash'
import { observer } from 'mobx-react'
import { inject } from 'react-tunnel'

export default (request) => (Component) => {
  // * connect('foo' || [ 'foo', 'bar' ]) -> provide storeKey data into props
  //
  // in 'foo' out ({ foo: store('foo') })
  // in ['foo', 'bar'] out ({ foo: store('foo'), bar: store('bar') })
  const injectStoresIntoProps = inject(({ store }) =>
    (isArray(request) ? request : [ request ])
      .reduce((props, storeKey) =>
        ({ ...props, [storeKey]: store(storeKey) }),
        {}
    )
  )

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
