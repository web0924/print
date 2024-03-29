const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const src = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: './src/main.js',

  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV !== 'development' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'global': path.resolve(__dirname, '../src/global'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'views': path.resolve(__dirname, '../src/views'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'api': path.resolve(__dirname, '../src/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'store': path.resolve(__dirname, '../src/store'),
      'router': path.resolve(__dirname, '../src/router'),
      'mock': path.resolve(__dirname, '../src/mock'),
      'vendor': path.resolve(__dirname, '../src/vendor'),
      'static': path.resolve(__dirname, '../static')
    }
  },
  externals: {
    // jquery: 'jQuery'
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  },
  module: {
    rules: [
      // {
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     enforce: "pre",
      //     include: [resolve('src'), resolve('test')],
      //     options: {
      //         formatter: require('eslint-friendly-formatter')
      //     }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          name: '[name].[hash:7].[ext]',			//文件名
          publicPath: '../',					//打包时替换的路径
          outputPath: utils.assetsPath('fonts/')	//文件输出路径
        }
      }
    ]
  },
  //注入全局mixin
  // sassResources: path.join(__dirname, '../src/styles/mixin.scss'),
  // sassLoader: {
  //     data:  path.join(__dirname, '../src/styles/index.scss')
  // },
}
