import React from 'react'
import DevTools from 'mobx-react-devtools'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-tunnel'
import { Router, browserHistory, RouterContext, match } from 'react-router'

import routes from 'app/routes'

import fetchData from './fetch-data'
import { rehydrate, dehydrate } from './hydrate'

const { NODE_ENV, BROWSER } = process.env

export default async ({ store, location, assets } = {}) => {
  if (BROWSER) {
    rehydrate(store)

    // track potentially unnecessary re-renders
    // if we find `debugRender` in the query string
    if (NODE_ENV === 'development' &&
        window.location.search.includes('debugRender')) {
      const { whyDidYouUpdate } = require('why-did-you-update')
      whyDidYouUpdate(React)
    }

    const App = (
      <Provider provide={ { store } }>
        { () => <Router
          history={ browserHistory }
          routes={ routes } /> }
      </Provider>
    )

    const container = document.getElementById('app--container')

    if (NODE_ENV !== 'development') return render(App, container)

    // special render in development:
    // * enable react-hot-loader
    // * enable mobx-react-devtools
    const { AppContainer } = require('react-hot-loader')
    const Dev = (
      <div>
        <AppContainer key={ 0 }>{ App }</AppContainer>
        <DevTools key={ 1 } position={ { bottom: 0, right: 20 } } />
      </div>
    )

    render(Dev, container)
  } else {
    // server side rendering
    const ServerHTML = require('server/server-html')

    // promisify `match` from `react-router`
    const asyncMatch = () => new Promise((resolve) =>
      match({ routes, location }, (...args) => resolve(args))
    )

    const [ routerError, redirect, renderProps ] = await asyncMatch(location, routes)
    if (routerError || redirect) throw ({ error: routerError, redirect })

    await fetchData(store, renderProps)
    const appState = dehydrate(store)

    const body = renderToString(
      <Provider provide={ { store } }>
        { () => <RouterContext { ...renderProps } /> }
      </Provider>
    )

    return renderToString(
      <ServerHTML
        locale='fr_FR'
        assets={ assets }
        body={ body }
        appState={ appState } />
    )
  }
}
