const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    entry: './src/frontend/index.js',
    output: {
      // this is where the bundled frontend will go
      path: resolve(__dirname, 'src/public'),
      // this is the output filename
      filename: 'script.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          // copies static images to the public images folder
          {
            from: 'src/images',
            to: 'src/public/images'
          },
          // copies static css to the public css folder
          {
            from: 'src/css',
            to: 'src/public/css'
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: 'src/frontend/index.html',
        cache: false,
        inject: 'body',
        showErrors: true,
        publicPath: '/'
      })
    ],
    module: {
      rules: [
        {
          // tests if the code to be added uses a .js or .mjs suffix
          test: /\.m?js$/,
          // excludes loaded js from node_modules and bower_components
          exclude: /(node_modules|bower_components)/,
          use: {
            // uses babel-loader to compile
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        'last 2 Chrome versions'
                      ]
                    }
                  }
                ]

              ],
              plugins: [
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    decoratorsBeforeExport: true
                  }
                ],
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: false,
                    regenerator: true
                  }
                ],
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  {
                    useBuiltIns: true
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.worker\.js$/, // matches files like *.worker.js
          use: {
            loader: 'worker-loader'
          }
        }

      ]
    }
  };
};
