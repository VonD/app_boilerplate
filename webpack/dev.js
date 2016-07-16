'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: ['babel-polyfill', './src/client'],
	output: {
		path: path.resolve(__dirname, '../dist/assets/'),
		filename: 'client.js',
		publicPath: 'http://localhost:8080/assets/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify("development"),
				BROWSER: JSON.stringify(true)
			}
		})
	],
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=stage-0&presets[]=react'],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	}
};
