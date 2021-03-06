/**
 * Build is more simple
 * Just bundle it with
 * libraryTarget commonjs2 -- most import thing
 */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env = {}) {
  const config = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      path: path.resolve(__dirname, '../dist', './umd'),
      library: 'simpleComponentsReact',
      libraryTarget: 'umd',
      filename: 'index.js',
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    mode: 'production',
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            envName: 'production',
            ...require('../babel.config.js')
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
    },
    // finally we pass it an array of our plugins
    plugins: [
      // new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    ],
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    },
  }

  if (!env.isPublish) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
