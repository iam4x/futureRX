import path from 'path'
import { fork } from 'child_process'

import debug from 'debug'
import { isFunction, noop } from 'lodash'

import browserSync from 'browser-sync'
import watch from 'node-watch'

let server = null
let serverReload = false

const startServer = (callback) => {
  const restartServer = () => {
    debug('dev')('restarting koa application')
    serverReload = true
    server.kill('SIGTERM')
    startServer()
  }

  const env = { ...process.env, DEBUG: 'dev,koa', BABEL_ENV: 'server' }
  server = fork(path.resolve('./server/index'), { env })

  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      if (serverReload) {
        serverReload = false
        browserSync.get('bs-webpack-plugin').reload()
      }

      if (isFunction(callback)) {
        callback()

        process.stdin.setEncoding('utf8')
        process.stdin.on('data', (data) => {
          const parsedData = `${data}`.trim().toLowerCase()
          if (parsedData === 'rs') restartServer()
        })

        watch(
          path.resolve('./server'),
          (file) => !file.match('webpack-stats.json') ? restartServer() : noop()
       )
      }
    }
  })
}

process.on('exit', () => server.kill('SIGTERM'))

export default startServer
