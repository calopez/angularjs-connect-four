/**
 * Creates the "game" AngularJS module
 *
 * @module game
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <clopez@alertlogic.com>
 *
 * @returns instance of game module
 *
 */
'use strict';

/* ----------------------------------------------------------------------------
*                           CONTROLLERS
* -----------------------------------------------------------------------------*/

var controllers = angular.module("game.controllers", []);

controllers.controller("ConnectFourController", require('./components/connectFour/ConnectFourController'));


/* ----------------------------------------------------------------------------
*                           APPLICATION
* -----------------------------------------------------------------------------*/

var game = angular.module("game", ['game.controllers']);

module.exports = game;
