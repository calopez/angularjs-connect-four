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

var ConnectFourController = function ($routeParams, ConnectFourAPIService) {
    'use strict';

    var CFour = this;
    CFour.title = "Connect Four Game";
    CFour.playing = true;
    CFour.showPlayerPaths= false;
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

    var game,
        gameService = ConnectFourAPIService.ConnectFourGame(CFour.player.one.id, CFour.player.two.id);




    /** ------------------------------------------------------------------------------
     *                                CONTROL
     * -------------------------------------------------------------------------------- */

    CFour.startGame = function () {
        gameService.start().then(function (response) {
            CFour.board = response.data;
            CFour.showPlayerPaths= true;
        });
    };

    CFour.play = function (row, col) {
        gameService.play(row, col, CFour.palyerId).then(function (response) {
            CFour.board = response.data;
                console.log(response);
        });
    };


    /** ------------------------------------------------------------------------------
     *                                INIT
     * -------------------------------------------------------------------------------- */

    if ($routeParams.playerId === undefined) {
        CFour.playing = false;

    } else {
        console.log('$routeParams.playerId:'+$routeParams.playerId + '-'+CFour.player.one.id );
        if (Number($routeParams.playerId) === CFour.player.one.id ||
            Number($routeParams.playerId) === CFour.player.two.id) {
 console.log('calling...');
            CFour.palyerId = $routeParams.playerId;
            CFour.rightPlayer = true;
            CFour.playing = true;

            gameService.get().then(function (response) {
               CFour.board = response.data;
                console.log('la respuesta');
                            console.log(response);

            });


        }
    }


};

ConnectFourController.$inject = ['$routeParams', 'ConnectFourAPIService'];

module.exports = ConnectFourController;
