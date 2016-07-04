const { module: { loaders } } = require('./shared.config')

module.exports = {
  module: { loaders },
  output: { libraryTarget: 'commonjs2' },
  resolve: {
    extensions: [ '', '.js', '.json', '.jsx' ]
  }
}
