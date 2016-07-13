const { NODE_ENV = 'development' } = process.env

// WEBPACK BUILD CONSTANTS
export const JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/
export const EXCLUDE_REGEX = /node_modules/

export const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
]

export const DEV = NODE_ENV === 'development'
