/**
 * webpack config
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		publicPath: path.resolve(__dirname, '/')
	},
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
    '@actions': path.resolve(__dirname, './src/actions'),
    '@constants': path.resolve(__dirname, './src/constants'),
    '@containers': path.resolve(__dirname, './src/containers'),
    "@apis": path.resolve(__dirname, './src/apis')
   }
  },
  module: {
    rules: [{
			test: /\.tsx?$/,
			exclude: /^node_modules/,
			use: {
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json')
        }
			}
		}, {
			test: /\.css?$/,
			loaders: ['style-loader', 'css-loader']
		}]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
		})
  ],
  devServer: {
    host: '127.0.0.1',
    port: '8888',
    historyApiFallback: true
  }
}