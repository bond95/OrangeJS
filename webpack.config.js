// var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require("webpack");

module.exports = {
	entry: {
		app: __dirname + '/src/',
	},
	output: {
		filename: 'orange.min.js',
		path: __dirname + '/dist',
	},

	resolve: {
		extensions: ['.js'],
		alias: {
            jquery: __dirname + '/node_modules/jquery/dist/jquery.min.js',
		}
	},

	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
		],
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: false})
	]
};