import debug from 'debug'
import { resolve } from 'path'

import Koa from 'koa'
import convert from 'koa-convert'
import mount from 'koa-mount'
import staticCache from 'koa-static-cache'

import createStore from 'app/store'
import render from 'core/universal-render'
import { PORT } from 'core/config'

const { NODE_ENV } = process.env

const app = new Koa()

// Proxy asset folder to webpack development server in development mode
if (NODE_ENV === 'development') {
  const proxy = require('koa-proxy')({
    host: `http://0.0.0.0:${PORT + 1}`,
    map: (filePath) => `assets/${filePath}`
  })
  app.use(convert(mount('/assets', proxy)))
} else {
  const cacheOpts = { maxAge: 86400000, gzip: true }
  app.use(convert(mount('/assets', staticCache(resolve('./dist'), cacheOpts))))
}

app.use(async (ctx) => {
  try {
    ctx.status = 200
    ctx.body = await render({
      // assets: require('./webpack-stats.json'),
      store: createStore(),
      location: ctx.request.url
    })

    // Don't cache assets name on dev
    if (NODE_ENV === 'development' || NODE_ENV === 'test') {
      delete require.cache[require.resolve('./webpack-stats.json')]
    }
  } catch (err) {
    // Render 500 error page from server
    const { error, redirect } = err
    if (error) throw error
    // Handle component `onEnter` transition
    if (redirect) {
      const { pathname, search } = redirect
      ctx.redirect(pathname + search)
    } else {
      throw err
    }
  }
})

app.listen(PORT)

// Tell parent process koa-server is started
if (process.send) process.send('online')
debug('koa')('`koa-render-server` started on port %s', PORT)
