'use strict';

const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './src/main/resources/static/dist');
const APP_DIR = path.resolve(__dirname, './frontend/src');

const config = {
    debug: true,
    devtool: 'inline-source-map',
    entry: APP_DIR + '/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss-loader!sass'
            }
        ]
    }
};

module.exports = config;