import { resolve } from 'path'
import { execSync, fork } from 'child_process'

import debug from 'debug'
import open from 'open'
import { noop } from 'lodash'

import browserSync from 'browser-sync'
import watch from 'node-watch'

import { PORT } from '../../core/config'

let server = null
let serverReload = false
let firstServerStart = true

const startServer = () => {
  const env = { ...process.env, DEBUG: 'dev,koa', BABEL_ENV: 'server' }

  // compile first the server code,
  // it will be re-compiled at every server restart
  const webpackServerConfig = resolve(__dirname, '../../webpack/server.config.babel.js')
  execSync(`webpack --config ${webpackServerConfig}`, { env, encoding: 'utf8' })
  debug('dev')('compiled server code updated')

  // define `restartServer` function
  const restartServer = () => {
    debug('dev')('restarting koa application')
    serverReload = true
    server.kill('SIGTERM')
    startServer()
  }

  server = fork(resolve(__dirname, '../../server/build.js'), { env })

  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      // tell `browserSync` to reload the browser,
      // server code has restarted
      if (serverReload) {
        serverReload = false
        browserSync.get('bs-webpack-plugin').reload()
      }

      // open browser after server started
      if (firstServerStart) {
        firstServerStart = false
        open(`http://localhost:${PORT + 2}`)
      }

      // watch for `rs` into console to restart server
      process.stdin.setEncoding('utf8')
      process.stdin.on('data', (data) => {
        const parsedData = `${data}`.trim().toLowerCase()
        if (parsedData === 'rs') restartServer()
      })

      // watch for `./server` changes and auto-reload server & browser
      const excludedFiles = [ 'webpack-stats.json', 'build.js' ]
      watch(
        resolve(__dirname, '../../server'),
        (file) => !excludedFiles.some((excluded) => file.match(excluded)) ? restartServer() : noop()
      )
    }
  })
}

process.on('exit', () => server ? server.kill('SIGTERM') : undefined)

export default startServer
