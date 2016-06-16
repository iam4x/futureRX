import { isString, isArray } from 'lodash'
import { observer } from 'mobx-react'
import { inject } from 'react-tunnel'

const excludedProps = Object.getOwnPropertyNames(() => undefined)

// borrowed from `react-redux/connect`
// https://github.com/rackt/react-redux/blob/master/src/components/connect.js#L17
const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

export default (params) => (Component) => {
  // * connect('foo' || [ 'foo', 'bar' ]) -> provide storeKey data into props
  //
  // in 'foo' out ({ foo: store('foo') })
  // in ['foo', 'bar'] out ({ foo: store('foo'), bar: store('bar') })
  const injectStoresIntoProps = inject(({ store }) => {
    if (isString(params)) {
      return ({ [params]: store(params) })
    }

    if (isArray(params)) {
      return params.reduce((result, storeKey) =>
        ({ ...result, [storeKey]: store(storeKey) }))
    }

    return ({ store })
  })

  // * observe decorated component by `mobx-react::observer`
  // * connect props from context onto decorated component
  const FinalComponent = injectStoresIntoProps(observer(Component))

  // copy missing static methods from `Component` to `FinalComponent`
  Object.getOwnPropertyNames(Component).forEach((prop) => {
    if (excludedProps.indexOf(prop) < 0 &&
        typeof Component[prop] === 'function' &&
        !FinalComponent[prop]) {
      FinalComponent[prop] = Component[prop]
    }
  })

  // set `connect(Component)` as displayName
  FinalComponent.displayName = `connect(${getDisplayName(Component)})`

  return FinalComponent
}
