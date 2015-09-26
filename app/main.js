'use strict';


var app = require('./app');

try {

    angular.element(document).ready(function () {

        angular.bootstrap(document, [app.name], {});

    });

} catch (e) {
    console.error("Caught an error during bootstrap: %s", e.message);
}

module.exports = app;
