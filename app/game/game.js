/**
 * Creates the "game" AngularJS module
 *
 * @module game
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <karloslopez@me.com>
 *
 * @returns instance of game module
 *
 */
'use strict';


/* ----------------------------------------------------------------------------
*                           SERVICES
* -----------------------------------------------------------------------------*/

var services = angular.module("game.services", []);

services.service("FakeGameService", require('./components/services/FakeGameService'));
services.service("ConnectFourAPIService", require('./components/services/ConnectFourAPIService'));

/* ----------------------------------------------------------------------------
*                           CONTROLLERS
* -----------------------------------------------------------------------------*/

var controllers = angular.module("game.controllers", []);

controllers.controller("ConnectFourController", require('./components/connectFour/ConnectFourController'));


/* ----------------------------------------------------------------------------
*                           APPLICATION
* -----------------------------------------------------------------------------*/

var game = angular.module("game", ['game.controllers', 'game.services']);

module.exports = game;
