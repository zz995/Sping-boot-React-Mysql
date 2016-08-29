'use strict';

const path = require('path');
const webpack = require('webpack');

const DEBUG = !process.argv.includes('--release');

const BUILD_DIR = path.resolve(__dirname, './src/main/resources/static/dist');
const APP_DIR = path.resolve(__dirname, './frontend/src');

module.exports = {
    cache: DEBUG,
    debug: DEBUG,
    devtool: DEBUG ? 'inline-source-map' : false,
    stats: {
        colors: true,
        progress: true
    },
    entry: [
        'babel-polyfill',
        path.join(APP_DIR, 'app.jsx')
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        ...(!DEBUG ? [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false
                }
            })
        ] : [
            new webpack.HotModuleReplacementPlugin()
        ]),
    new webpack.NoErrorsPlugin()
],
module: {
    loaders: [
        {
            exclude: /node_modules/,
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, "frontend")
            ],
            loader:  'react-hot!babel-loader',
            plugins: ['transform-runtime']
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss-loader!sass'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url?limit=10000'
        }
    ]
},
devServer: {
    host: 'localhost',
        port: 3000,
        contentBase: path.join(BUILD_DIR, '..'),
        hot: true,
        inline: true,
        proxy: {
        '/api': {
            target: 'http://localhost:8090',
                secure: false,
                prependPath: false
        }
    }
}
};