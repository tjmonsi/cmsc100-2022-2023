const { merge } = require('webpack-merge');
const common = require('./webpack.config.cjs');

/**
 *
 * @returns
 */
module.exports = function () {
  return merge(common(), {
    mode: 'development',
    devtool: 'eval-source-map'
  });
};
