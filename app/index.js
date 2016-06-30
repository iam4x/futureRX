// global defined styles
import 'app/styles/global.css'

import { after } from 'lodash'
import { browserHistory, match } from 'react-router'

import routes from 'app/routes'

import createStore from 'app/store'

import renderApp from 'core/universal-render'
import fetchData from 'core/fetch-data'

const store = createStore()
renderApp({ store })

// we have to define the `browserHistory` listener here since we need to
// dispose the listener on hot module reload
const unlisten = browserHistory.listen(after(2, ({ pathname }) =>
  match({ routes, location: pathname }, (error, redirect, props) =>
    props ? fetchData(store, props) : undefined
  )
))

if (module.hot) {
  module.hot.dispose(unlisten)
  module.hot.accept(renderApp)
}
