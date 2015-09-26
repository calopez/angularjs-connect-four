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

var ConnectFourController = function ($scope, $routeParams, ConnectFourAPIService, PollingService) {
    'use strict';

    var CFour = this;
    CFour.title = "Connect Four Game";
    CFour.playing = true;
    CFour.showPlayerPaths = false;
    CFour.rightPlayerId = false;

    CFour.player = {
        one: {
            id: 1,
            path: '/games/1'
        },
        two: {
            id: 2,
            path: '/games/2'
        }
    };

    var gameService = ConnectFourAPIService.ConnectFourGame(CFour.player.one.id, CFour.player.two.id);

    /** ------------------------------------------------------------------------------
     *                                INIT
     * -------------------------------------------------------------------------------- */

    if ($routeParams.playerId === undefined) {
        CFour.playing = false;

    } else {

        if (Number($routeParams.playerId) === CFour.player.one.id ||
            Number($routeParams.playerId) === CFour.player.two.id) {
            CFour.playerId = $routeParams.playerId;
            CFour.rightPlayer = true;
            CFour.playing = true;
        }
    }


    /** ------------------------------------------------------------------------------
     *                                CONTROL
     * -------------------------------------------------------------------------------- */

    //    var updateBoard = function methodName (arguments) {
    //
    //    };

    CFour.startGame = function () {
        gameService.start().then(function (response) {
            CFour.board = response.data;
            CFour.showPlayerPaths = true;
        });
    };

    CFour.play = function (row, col) {
        gameService.play(row, col, CFour.playerId).then(function (response) {
            CFour.board = response.data;

        });
    };

    /** ------------------------------------------------------------------------------
     *                                "REAL TIME" LIKE
     * -------------------------------------------------------------------------------- */

    var request = PollingService.Polling($scope),
        interval = 500,
        i, j;

    if (CFour.playing === true) {

        request.startPolling('CFour/refresh', gameService.get, interval);

        $scope.$on('CFour/refresh', function (evt, response) {

            if (CFour.board === undefined) {
                CFour.board = response.data;
            } else {
                var board = response.data;
                var numberOfRows = CFour.board.length, // sure this should be properties of the board.
                    numberOfCols = CFour.board[0].length;

                for (i = 0; i < numberOfRows; i++) {
                    for (j = 0; j < numberOfCols; j++) {
                        if (CFour.board[i][j].value !== board[i][j].value) {

                            CFour.board[i][j].player = board[i][j].player;
                            CFour.board[i][j].value = board[i][j].value;
                        }
                            CFour.board[i][j].currentRow = board[i][j].currentRow;

                    }
                }
            }

        });
    }


};

ConnectFourController.$inject = ['$scope', '$routeParams', 'ConnectFourAPIService', 'PollingService'];

module.exports = ConnectFourController;
