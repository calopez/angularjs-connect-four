
module.exports = function(config) {
'use strict';

    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'node_modules/phantomjs-polyfill/bind-polyfill.js', // This is a polyfill for function.prototype.bind which is missing from PhantomJS.
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/**/*.test.js'
        ],

        exclude: [],

        preprocessors: {
            'app/**/*.test.js': ['webpack']
        },

        webpack: require('./webpack.config'),

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-html-reporter',
            'karma-coverage',
            require("karma-webpack"),
            require("karma-sourcemap-loader"),
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html', 'coverage'],

        coverageReporter: {
            dir : 'test_results/coverage/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                { type: 'text', subdir: '.', file: 'text.txt' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
            ]
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
