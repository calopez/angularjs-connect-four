/**
 * ConnectFourController
 *
 * @module myapp
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <karloslopez@me.com>
 *
 * @returns instance of the ConnectFourController
 *
 */

require('./connectFour.styl');
require('ngtemplate?relativeTo=/game/components/connectFour!./connectFour.html');

var ConnectFourController = function () {
    'use strict';

    var CFour = this;

    CFour.title = "Connect Four Game";




};

ConnectFourController.$inject = [];

module.exports = ConnectFourController;
