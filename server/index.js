// Delete the `BROWSER` env variable if it's present
delete process.env.BROWSER

// Tell `require` calls to look into project directory
process.env.NODE_PATH = './'
require('module').Module._initPaths()

// Install `babel` hook for ES6
require('babel-core/register')
require('babel-polyfill')

// Start the server
require('./koa')
