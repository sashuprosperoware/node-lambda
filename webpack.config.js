var webpack = require('webpack')
var path = require("path");

module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        entry: './src/entry.js'
    },
    output: {
        filename: './user-services.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}