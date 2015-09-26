'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer-stylus');

var PATH = {
    app: __dirname + '/app',
    npm: __dirname + '/node_modules'
};

var config = {
    context: PATH.app,

    entry: {
        main: './main.js'
    },

    output: {
        path: path.resolve('build/'),
        filename: "[name].bundle.js",
        publicPath: "/public/assets/"
    },
    devServer: {
        contentBase: 'public'
    },
    devtool: 'eval',
//    devtool: 'inline-source-map',
    debug: true,
    watch: true,
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            minimize: true
        }),
    ],
    module: {
        noParse: [],
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            }
        ],
        loaders: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/axis/'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
                loader: "url?name=[name].[ext]&limit=10000&minetype=image/svg+xml"
            },
            {
                //  images that are 25KB or smaller in size will be converted to a BASE64 string and
                //  included in the CSS file where it is defined
                test: /\.jpg$/,
                loader: 'url?name=img/[name].[ext]&mimetype=image/jpg&limit=25000'
            }, {
                test: /\.png$/,
                loader: 'url?name=img/[name].[ext]&mimetype=image/png&limit=25000'
            }, {
                test: /\.gif$/,
                loader: 'url?name=img/[name].[ext]&mimetype=image/gif&limit=25000'
            },
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
                loader: "url?name=[name].[ext]&limit=10000&minetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
                loader: "url?name=[name].[ext]&limit=10000&minetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?(\?\-fvbane)?$/,
                loader: "file"
            }

        ],
        postLoaders: [{ // << add subject as webpack's postloader
            test: /\.js$/,
            exclude: /(public|node_modules)\//,
            loader: 'istanbul-instrumenter'
        }]
    },
    stylus: {
      use: [autoprefixer()]
    },
    resolve: {
        root: [PATH.npm, PATH.app, PATH.app + '/assets'],
        alias: {},
        extensions: ['', '.js', '.styl']
    }
};


/**
 * Use the minified versions of the dependencies
 */

var deps = {
    angular: 'angular/angular.min.js',
    ngRoute: 'angular-route/angular-route.min.js',
    ngResource: 'angular-resource/angular-resource.min.js',
    ngSanitize: 'angular-sanitize/angular-sanitize.min.js',
    ngAnimate: 'angular-animate/angular-animate.min.js',
    LocalStorageModule: 'angular-local-storage/dist/angular-local-storage.min.js',
    jeet:'jeet/stylus/jeet/index.styl',
    rupture:'rupture/rupture/index.styl'
};

var module_path;
Object.keys(deps).forEach(function (alias) {
    module_path = path.resolve(PATH.npm, deps[alias]);
    config.resolve.alias[alias] = module_path;
    config.module.noParse.push(module_path);
});

/**
 * Export configuration as a module
 */

module.exports = config;
