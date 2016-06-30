import { resolve } from 'path'

import {
  JS_REGEX,
  EXCLUDE_REGEX,
  AUTOPREFIXER_BROWSERS
} from '../constants'

const { BUILD_HASH = 'DEFAULT' } = process.env

export default {
  module: {
    preLoaders: [
      { test: JS_REGEX, exclude: EXCLUDE_REGEX, loader: 'eslint' }
    ],

    loaders: [
      { test: /\.json$/, exclude: EXCLUDE_REGEX, loader: 'json' },
      { test: JS_REGEX, exclude: EXCLUDE_REGEX, loader: 'babel' },
      {
        test: /\.css$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?sourceMap&modules&localIdentName=[name]_[local]_${BUILD_HASH}`,
          'postcss-loader'
        ]
      }
    ]
  },

  postcss: (bundler) => [
    require('postcss-import')({ addDependencyTo: bundler }),
    require('precss')(),
    require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
  ],

  resolve: {
    root: resolve('./'),
    modulesDirectories: [ resolve('node_modules') ],
    extensions: [ '', '.js', '.json', '.jsx' ]
  }
}
