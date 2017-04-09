const path = require('path');

const config = {
	entry: [
		'./src/main.js'
	],
	output: {
		path: __dirname,
		// publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			exclude: /node_modules/,
			loader: "babel-loader",
			query: {
				presets: ['react', 'es2015', 'stage-1']
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		enforceExtension: false
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './'
	}
};	

module.exports = config;