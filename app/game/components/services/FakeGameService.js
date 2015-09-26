/**
 * FakeGameService service provides a fake state of the game
 * @module game
 *
 * @requires angular
 *
 * @author Carlos A. Lopez <karloslopez@me.com>
 *
 * @returns instance of the FakeGameService service
 *
 */

var FakeGameService = function (localStorageService) {
    'use strict';


    var player = {
        ONE: null,
        TWO: null
    };
    var turnFor = {
        PLAYER1: true,
        PLAYER2: false
    };

    var toggleTurn = function () {
        turnFor.PLAYER1 = !turnFor.PLAYER1;
        turnFor.PLAYER2 = !turnFor.PLAYER2;
    };

    /** ------------------------------------------------------------------------------
     *                                DESIGN
     * -------------------------------------------------------------------------------- */
    var TokenClass = {
        new: function () {
            var obj = {
                player: this.player,
                value: this.value,
                currentRow: this.currentRow,
                currentTurn: this.currentTurn
            };
            return JSON.parse(JSON.stringify(obj));
        }
    };

    var ProtoToken = Object.create(TokenClass);
    var Token = ProtoToken.new();

    Token.init = function (value, player, currentRow) {
        this.value = value || 0;
        this.player = player || 0;
        this.currentRow = currentRow || 0;
        this.currentTurn = 0;
    };

    Token.subtractRow = function () {
        return this.currentRow === 0 ? 0 : this.currentRow--;
    };

    /** ------------------------------------------------------------------------------
     *                                SERVICE
     * -------------------------------------------------------------------------------- */
    var CFour = {},
        nullService = {
            play: null,
            start: null,
            get: null,
            status: null
        },
        service = nullService;


    this.startNewGame = function () {

        var board = localStorageService.get('Cfour.board');

        if (board) {
            CFour.board  = board;
            return CFour.board;
        }

        service = JSON.parse(JSON.stringify(nullService));;
        service.status = 'new';

        toggleTurn();

        var i,
            item,
            token,
            depthRow = 6,
            row = [0, 0, 0, 0, 0, 0, 0];

        CFour.board = [];

        for (i = 0; i < depthRow; i++) {

            item = row.map(function () {
                token = Object.create(Token);
                token.init(0, 0, depthRow - 1);
                return token;
            });

            CFour.board.push(item);
        }

    };

    this.GameServer = function (player1, player2) {

        player.ONE = player1;
        player.TWO = player2;

        var play = function (row, col, player) {

            var token = CFour.board[row][col];

            console.log(token)
            CFour.board[token.currentRow][col].value = player; // well seems I just needed one
            CFour.board[token.currentRow][col].player = player;

            Token.subtractRow.call(token)

            localStorageService.add('Cfour.board', CFour.board);

            return CFour.board;
        };

        var start = function () {
            localStorageService.remove('Cfour.board');
            return CFour.board;
        };

        var get = function () {
            return CFour.board;
        };

        service.play = play;
        service.start = start;
        service.get = get;

        return service;
    };
};

FakeGameService.$inject = ['localStorageService'];

module.exports = FakeGameService;
