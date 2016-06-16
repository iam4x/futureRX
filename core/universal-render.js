import React from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-tunnel'
import { Router, browserHistory, RouterContext, match } from 'react-router'

import routes from 'app/routes'

import fetchData from './fetch-data'
import { rehydrate, dehydrate } from './hydrate'

const { NODE_ENV, BROWSER } = process.env

export default async ({ stores, location, assets } = {}) => {
  if (BROWSER) {
    rehydrate(stores)

    // track potentially unnecessary re-renders
    // if we find `debugRender` in the query string
    if (NODE_ENV === 'development' &&
        window.location.search.includes('debugRender')) {
      const { whyDidYouUpdate } = require('why-did-you-update')
      whyDidYouUpdate(React)
    }

    const App = () => (
      <Provider provide={ { stores } }>
        { () => <Router
          history={ browserHistory }
          routes={ routes } /> }
      </Provider>
    )

    const container = document.getElementById('app--container')

    if (NODE_ENV !== 'development') return render(<App />, container)

    // special render, enable react-hot-loader
    const { AppContainer } = require('react-hot-loader')
    render(<AppContainer><App /></AppContainer>, container)
  } else {
    // server side rendering
    const ServerHTML = require('server/server-html')

    // promisify `match` from `react-router`
    const asyncMatch = () => new Promise((resolve) =>
      match({ routes, location }, (...args) => resolve(args))
    )

    const [ routerError, redirect, renderProps ] = await asyncMatch(location, routes)
    if (routerError || redirect) throw ({ error: routerError, redirect })

    await fetchData(stores, renderProps)
    const appState = dehydrate(stores)

    const body = renderToString(
      <Provider provide={ { stores } }>
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
