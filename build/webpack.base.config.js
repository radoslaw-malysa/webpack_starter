const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/app',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.[contenthash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: [/.js$|.ts$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript', 
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {loader: 'file-loader'},
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //name: '[name].[hash:8].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: [/.css$|.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@scss': path.resolve(__dirname, '../src/scss'),
      '@img': path.resolve(__dirname, '../src/img'),
      '@': path.resolve(__dirname, '../src')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src')
    ],
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack 4 starter kit',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    })
  ]
}
