var path    = require('path'),
    webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './client/app.js',
    output: {
        path: path.join( __dirname, 'public' ),
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            // jsx
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // sass
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
            // fonts
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file?name=./fonts/[name].[ext]' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,  loader: 'file?name=./fonts/[name].[ext]' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=./fonts/[name].[ext]' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file?name=./fonts/[name].[ext]' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file?name=./fonts/[name].[ext]' },
            // font-awesome
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,      loader: "url?limit=10000&minetype=application/font-woff&name=./fonts/[name].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=./fonts/[name].[ext]" }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
