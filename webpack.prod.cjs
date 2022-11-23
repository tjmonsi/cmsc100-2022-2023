const { merge } = require('webpack-merge');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const common = require('./webpack.config.cjs');

module.exports = function () {
  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new WebpackManifestPlugin({})
    ]
  });
};
