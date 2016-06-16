import after from 'lodash/after'
import { browserHistory, match } from 'react-router'

import routes from 'app/routes'

import createStores from 'app/stores'

import renderApp from 'core/universal-render'
import fetchData from 'core/fetch-data'

const stores = createStores()
renderApp({ stores })

// we have to define the `browserHistory` listener here since we need to
// dispose the listener on hot module reload
const unlisten = browserHistory.listen(after(2, ({ pathname }) =>
  match({ routes, location: pathname }, (error, redirect, props) =>
    props ? fetchData(stores, props) : undefined
  )
))

if (module.hot) {
  module.hot.dispose(unlisten)
  module.hot.accept(renderApp)
}
