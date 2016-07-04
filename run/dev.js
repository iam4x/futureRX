process.env.BABEL_ENV = 'browser'
process.env.NODE_ENV = 'development'

require('babel-register')
require('babel-polyfill')

const debug = require('debug')

const startRenderServer = require('./utils/start-render-server')
const startWebpackServer = require('./utils/start-webpack-server')

debug.enable('dev,koa')

startWebpackServer(startRenderServer)
