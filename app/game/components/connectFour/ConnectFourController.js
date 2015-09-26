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

var ConnectFourController = function ( $routeParams ) {
    'use strict';

    var CFour = this;

    CFour.title = "Connect Four Game";
    CFour.rightPlayer = true;

    /** ------------------------------------------------------------------------------
     *                                INIT
     * -------------------------------------------------------------------------------- */
        if( $routeParams.playerId ) {
            CFour.palyerId =  $routeParams.playerId;
        } else {
            CFour.rightPlayer = false;
        }

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
     *                                TOKENS
     * -------------------------------------------------------------------------------- */

    CFour.play = function (row, col) {
        console.log('click on:' + row + ',' + col);
        console.log(CFour.board[row][col]);

        var token = CFour.board[row][col];
        console.log('token.currentRow:' + token.currentRow);
        CFour.board[token.currentRow][col].value  = CFour.palyerId; // well it seems I just needed one
        CFour.board[token.currentRow][col].player = CFour.palyerId;

        token.subtractRow();
    };



    var row = [0, 0, 0, 0, 0, 0, 0];

    var i, item, token, depthRow = 6;
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

ConnectFourController.$inject = ['$routeParams'];

module.exports = ConnectFourController;
