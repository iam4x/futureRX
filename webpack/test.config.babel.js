export default {
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'css?modules!postcss' },
      { test: /\.md$/, loader: 'raw' }
    ]
  },
  output: { libraryTarget: 'commonjs2' },
  resolve: {
    extensions: [ '', '.js', '.json', '.jsx' ]
  }
}
