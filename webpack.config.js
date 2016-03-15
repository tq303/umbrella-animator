var path    = require('path'),
    webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './client/app.js',
    output: {
        path: path.join( __dirname, 'public' ),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/styles.css', {
            allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: 'node_modules/font-awesome/fonts', to: 'public/fonts' },
            { from: 'node_modules/react-select/dist/react-select.css', to: 'public/styles' }
        ])
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
