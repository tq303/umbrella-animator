var path    = require('path'),
    webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: ( process.env.NODE_ENV === 'production' ) ? null : 'cheap-source-map',
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
            { test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=./fonts/[name].[ext]" },
            // font-awesome
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,      loader: "url?limit=10000&minetype=application/font-woff&name=./fonts/[name].[ext]" },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'client/index.html', to: '.' },
        ]),
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //       'NODE_ENV': JSON.stringify('production')
        //     }
        // })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
