/**
 * ConnectFourAPIService service provides functions intetact with the Connect Four API Service
 *
 * @module noc
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <karloslopez@me.com>
 *
 * @returns instance of the ConnectFourAPIService service
 *
 */

var ConnectFourAPIService = function ($http, $q, FakeGameService) {
    'use strict';

    var url = 'https://deviget.connectfour.com/game/v1';

    var game;
    FakeGameService.startNewGame();
    game = FakeGameService.GameServer();


    this.ConnectFourGame = function () {


        var play = function (row, col, player) {
            var req, response, playDefered;

            playDefered = $q.defer();

            req = {
                method: 'PUT',
                url: url + '/play',
                play: {
                    row: row,
                    col: col,
                    player: player
                }
            };

            response = {
                data: game.play(row, col, player),
                meta: {
                    request: req
                }
            };

            playDefered.resolve(response);

            //return $http(req); if we had a real api
            return playDefered.promise;

        };


        var start = function (player1, player2) {
            var req, response, startDefered;

            startDefered = $q.defer();

            req = {
                method: 'POST',
                url: url + '/start',
                play: {
                    player1: player1,
                    player2: player2
                }
            };

            response = {
                data: game.start(player1, player2),
                meta: {
                    request: req
                }
            };

            startDefered.resolve(response);
            //return $http(req); if we had a real api
            return startDefered.promise;

        };

        var get = function () {
            var req, response, getDefered;

            getDefered = $q.defer();

            req = {
                method: 'GET',
                url: url + '/get'
            };

            response = {
                data: game.get(),
                meta: {
                    request: req
                }
            };

            getDefered.resolve(response);
            //return $http(req); if we had a real api
            return getDefered.promise;

        };


        return {
            play: play,
            start: start,
            get: get
        };
    };
};

ConnectFourAPIService.$inject = ['$http', '$q', 'FakeGameService'];

module.exports = ConnectFourAPIService;
