const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')]
			}
		]
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
	},

	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		sourceMapFilename: "bundle.js.map"
	},

	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 8080
	},

	devtool: "source-map"
}