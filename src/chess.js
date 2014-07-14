/**
 * Created by dgutierrez-diez on 30.06.14.
 */

requirejs(['jquery', 'jquery_ui'], function($, $ui)
    {
        kingIsDead = false;

        white = true;

        moved = false;

        iterations = 0;

        pawnWhite = "&#9817";
        rookWhite = "&#9814";
        nightWhite = "&#9816";
        bishopWhite = "&#9815";
        kingWhite = "&#9812";
        queenWhite = "&#9813";

        pawnBlack = "&#9823";
        rookBlack = "&#9820";
        nightBlack = "&#9822";
        bishopBlack = "&#9821";
        kingBlack = "&#9818";
        queenBlack = "&#9819";

        empty = 0;

        piecesWhite = [  pawnWhite, rookWhite, nightWhite , bishopWhite , queenWhite, kingWhite, bishopWhite, nightWhite, rookWhite ];

        piecesBlack = [   rookBlack, nightBlack, bishopBlack, queenBlack, kingBlack, bishopBlack, nightBlack, rookBlack, pawnBlack ];

        board = [0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0];

        /*sets the board in the initial status*/
        function resetBoard()
            {
            for (var i = 1; i <= 8; i++) {
                board [i] = piecesWhite[i];
            }
            for (var i = 9; i <= 16; i++) {
                board [i] = pawnWhite;
            }

            for (var j = 64, i = 0; j > 56; j--, i++) {
                board [j] = piecesBlack[i];
            }

            for (var j = 56; j > 48; j--) {
                board [j] = pawnBlack;
            }

            for (var i = 1; i <= 64; i++) {
                if (board[i] != empty) {
                    var tdId = "#" + i;
                    $(tdId).html(board[i]);
                }
            }

            };

        /*draws current status of the board*/
        function drawBoard()
            {

            for (var i = 1; i <= 64; i++) {
                var tdId = "#" + i;
                if (board[i] != empty) {
                    $(tdId).html(board[i]);
                } else {
                    $(tdId).html("");
                }
            }
            }

        /*returns true is the king is checked, flase otherwise*/
        function kingIsChecked()
            {

            var oponents = [];
            if (white) {
                oponents = getAllWhitesFilled();
            } else {
                oponents = getAllBlacksFilled();
            }

            for (var i = 0; i < oponents.length; i++) {
                var oponentMoves = getMoves(oponents[i]);

                if ($.inArray(getNextKing(), oponentMoves) != -1) {
                    return true;
                }
            }
            return false;
            }

        /*returns true is the king is checked, flase otherwise*/
        function kingIsCheckedVirtual()
            {

            var oponentsVirtual = [];
            if (white) {
                oponentsVirtual = getAllWhitesFilled();
            } else {
                oponentsVirtual = getAllBlacksFilled();
            }

            for (var i = 0; i < oponentsVirtual.length; i++) {
                var oponentMovesVirtual = getMovesVirtual(oponentsVirtual[i]);

                if ($.inArray(getNextKing(), oponentMovesVirtual) != -1) {
                    return true;
                }
            }
            return false;
            }

        /*if king is checked and mated returns true*/
        function kingIsNotMated()
            {
            if (kingIsChecked()) {
                console.log("checked");
            }
            return true;

            }

        /*king is in the board?*/
        function kingIsNotDead()
            {
            if (!white)
                kingIsDead = $.inArray(kingBlack, board) == -1;
            else
                kingIsDead = $.inArray(kingWhite, board) == -1;

            return !kingIsDead;
            }

        /*resets highlights*/
        function UnFocusAllHighlighted()
            {
            $(".highlighted").css("font-weight", "normal");
            $(".highlighted").css("color", "#000");
            $(".highlighted").removeClass("highlighted");
            }

        /*re focus again the pieces that can move*/
        function focusAgain()
            {
            if (!white)
                focusAllWhites();
            else
                focusAllBlacks();
            }

        /*if it is not possible to move*/
        function noPossibleMove()
            {
            return ($('body').find(".possibleMove").length) == 0;
            }

        /*deletes all markers from the board*/
        function deleteMarkers(destiny)
            {
            for (var i = 1; i <= 8; i++) {
                if (i % 2 == 0)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");

            }
            for (var i = 9; i <= 16; i++) {

                if (i % 2 == 1)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");
            }
            for (var i = 17; i <= 24; i++) {

                if (i % 2 == 0)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");
            }
            for (var i = 25; i <= 32; i++) {

                if (i % 2 == 1)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");
            }
            for (var i = 33; i <= 40; i++) {

                if (i % 2 == 0)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");
            }
            for (var i = 41; i <= 48; i++) {

                if (i % 2 == 1)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");
            }
            for (var i = 49; i <= 56; i++) {

                if (i % 2 == 0)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");
            }
            for (var i = 57; i <= 64; i++) {

                if (i % 2 == 1)
                    $("#" + i).css("background", "#ccc");
                else
                    $("#" + i).css("background", "#fff");
            }

            $(".sourceMove").removeClass("sourceMove");
            $("#" + destiny).css("background", "red");
            $(".possibleMove").removeClass("possibleMove");

            }

        /*returns all possible moves*/
        function getMoves(index)
            {
            var moves = [];
            //peon blanco
            if (pawnWhite == board[index]) {
                if (index + 8 < 65 && board[index + 8] == 0) {
                    moves[moves.length] = parseInt(index + 8);

                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] != 0) && ($.inArray(board[index + 7], piecesBlack) != -1)) {
                    moves[moves.length] = parseInt(index + 7);

                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] != 0) && ($.inArray(board[index + 9], piecesBlack) != -1)) {
                    moves[moves.length] = parseInt(index + 9);

                }

            }
            //peon negro
            if (pawnBlack == board[index]) {
                if (index - 8 > 1 && board[index - 8] == 0) {
                    moves[moves.length] = parseInt(index - 8);
                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] != 0) && ($.inArray(board[index - 7 ], piecesWhite) != -1)) {
                    moves[moves.length] = parseInt(index - 7);

                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] != 0) && ($.inArray(board[index - 9], piecesWhite) != -1)) {
                    moves[moves.length] = parseInt(index - 9);

                }

            }
            //rey blanco
            if (kingWhite == board[index]) {
                if (index + 1 < 65 && board[index + 1] == 0 && ((index) % 8 != 0)) {

                    if (canKingMoveThere(index + 1))
                        moves[moves.length] = parseInt(index + 1);

                }
                if (index + 1 < 65 && board[index + 1] != 0 && ($.inArray(board[index + 1], piecesBlack) != -1) && ((index) % 8 != 0)) {

                    if (canKingMoveThere(index + 1))
                        moves[moves.length] = parseInt(index + 1);

                }
                if (index - 1 > 1 && board[index - 1] == 0 && ((index) % 8 != 1)) {

                    if (canKingMoveThere(index - 1))
                        moves[moves.length] = parseInt(index - 1);

                }
                if (index - 1 > 1 && board[index - 1] != 0 && ($.inArray(board[index - 1], piecesBlack) != -1) && ((index) % 8 != 1)) {

                    if (canKingMoveThere(index - 1))
                        moves[moves.length] = parseInt(index - 1);

                }
                if (index + 8 < 65 && board[index + 8] == 0) {
                    if (canKingMoveThere(index + 8))
                        moves[moves.length] = parseInt(index + 8);

                }
                if (index + 8 < 65 && board[index + 8] != 0 && ($.inArray(board[index + 8], piecesBlack) != -1)) {
                    if (canKingMoveThere(index + 8))
                        moves[moves.length] = parseInt(index + 8);

                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] == 0)) {
                    if (canKingMoveThere(index + 7))
                        moves[moves.length] = parseInt(index + 7);

                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] != 0) && ($.inArray(board[index + 7], piecesBlack) != -1)) {
                    if (canKingMoveThere(index + 7))
                        moves[moves.length] = parseInt(index + 7);

                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] != 0) && ($.inArray(board[index + 9], piecesBlack) != -1)) {
                    if (canKingMoveThere(index + 9))
                        moves[moves.length] = parseInt(index + 9);

                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] == 0)) {
                    if (canKingMoveThere(index + 9))
                        moves[moves.length] = parseInt(index + 9);

                }
                if (index - 8 > 1 && board[index - 8] == 0) {

                    if (canKingMoveThere(index - 8))
                        moves[moves.length] = parseInt(index - 8);

                }
                if (index - 8 > 1 && board[index - 8] != 0 && ($.inArray(board[index + 8], piecesBlack) != -1)) {

                    if (canKingMoveThere(index - 8))
                        moves[moves.length] = parseInt(index - 8);

                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] != 0) && ($.inArray(board[index - 7 ], piecesBlack) != -1)) {

                    if (canKingMoveThere(index - 7))
                        moves[moves.length] = parseInt(index - 7);

                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] == 0)) {
                    if (canKingMoveThere(index - 7))
                        moves[moves.length] = parseInt(index - 7);

                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] != 0) && ($.inArray(board[index - 9], piecesBlack) != -1)) {

                    if (canKingMoveThere(index - 9))
                        moves[moves.length] = parseInt(index - 9);

                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] == 0)) {
                    if (canKingMoveThere(index - 9))
                        moves[moves.length] = parseInt(index - 9);

                }
            }
            //rey negro
            if (kingBlack == board[index]) {
                if (index + 1 < 65 && board[index + 1] == 0 && ((index) % 8 != 0)) {
                    if (canKingMoveThere(index + 1))
                        moves[moves.length] = parseInt(index + 1);

                }
                if (index + 1 < 65 && board[index + 1] != 0 && ($.inArray(board[index + 1], piecesWhite) != -1) && ((index) % 8 != 0)) {
                    if (canKingMoveThere(index + 1))
                        moves[moves.length] = parseInt(index + 1);

                }
                if (index - 1 > 1 && board[index - 1 ] == 0 && ((index) % 8 != 1)) {
                    if (canKingMoveThere(index - 1))
                        moves[moves.length] = parseInt(index - 1);

                }
                if (index - 1 > 1 && board[index - 1] != 0 && ($.inArray(board[index - 1], piecesWhite) != -1) && ((index) % 8 != 1)) {
                    if (canKingMoveThere(index - 1))
                        moves[moves.length] = parseInt(index - 1);

                }
                if (index + 8 < 65 && board[index + 8] == 0) {
                    if (canKingMoveThere(index + 8))
                        moves[moves.length] = parseInt(index + 8);

                }
                if (index + 8 < 65 && board[index + 8] != 0 && ($.inArray(board[index + 8], piecesWhite) != -1)) {
                    if (canKingMoveThere(index + 8))
                        moves[moves.length] = parseInt(index + 8);

                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] == 0)) {
                    if (canKingMoveThere(index + 7))
                        moves[moves.length] = parseInt(index + 7);

                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] != 0) && ($.inArray(board[index + 7], piecesWhite) != -1)) {
                    if (canKingMoveThere(index + 7))
                        moves[moves.length] = parseInt(index + 7);

                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] != 0) && ($.inArray(board[index + 9], piecesWhite) != -1)) {
                    if (canKingMoveThere(index + 9))
                        moves[moves.length] = parseInt(index + 9);

                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] == 0)) {
                    if (canKingMoveThere(index + 9))
                        moves[moves.length] = parseInt(index + 9);

                }
                if (index - 8 > 1 && board[index - 8] == 0) {
                    if (canKingMoveThere(index - 8))
                        moves[moves.length] = parseInt(index - 8);

                }
                if (index - 8 > 1 && board[index - 8] != 0 && ($.inArray(board[index + 8], piecesWhite) != -1)) {
                    if (canKingMoveThere(index - 8))
                        moves[moves.length] = parseInt(index - 8);

                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] != 0) && ($.inArray(board[index - 7 ], piecesWhite) != -1)) {
                    if (canKingMoveThere(index - 7))
                        moves[moves.length] = parseInt(index - 7);

                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] == 0)) {
                    if (canKingMoveThere(index - 7))
                        moves[moves.length] = parseInt(index - 7);

                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] != 0) && ($.inArray(board[index - 9], piecesWhite) != -1)) {
                    if (canKingMoveThere(index - 9))
                        moves[moves.length] = parseInt(index - 9);

                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] == 0)) {
                    if (canKingMoveThere(index - 9))
                        moves[moves.length] = parseInt(index - 9);

                }
            }

            return moves;
            }

        /*returns all possible moves*/
        function getMovesVirtual(index)
            {
            var movesVirtual = [];
            //peon blanco
            if (pawnWhite == board[index]) {
                if (index + 8 < 65 && board[index + 8] == 0) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 8);

                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] != 0) && ($.inArray(board[index + 7], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 7);

                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] != 0) && ($.inArray(board[index + 9], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 9);

                }

            }
            //peon negro
            if (pawnBlack == board[index]) {
                if (index - 8 > 1 && board[index - 8] == 0) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 8);
                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] != 0) && ($.inArray(board[index - 7 ], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 7);

                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] != 0) && ($.inArray(board[index - 9], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 9);

                }

            }
            //rey blanco
            if (kingWhite == board[index]) {
                if (index + 1 < 65 && board[index + 1] == 0 && ((index) % 8 != 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 1);
                }
                if (index + 1 < 65 && board[index + 1] != 0 && ($.inArray(board[index + 1], piecesBlack) != -1) && ((index) % 8 != 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 1);
                }
                if (index - 1 > 1 && board[index - 1] == 0 && ((index) % 8 != 1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 1);
                }
                if (index - 1 > 1 && board[index - 1] != 0 && ($.inArray(board[index - 1], piecesBlack) != -1) && ((index) % 8 != 1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 1);
                }
                if (index + 8 < 65 && board[index + 8] == 0) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 8);
                }
                if (index + 8 < 65 && board[index + 8] != 0 && ($.inArray(board[index + 8], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 8);
                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 7);
                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] != 0) && ($.inArray(board[index + 7], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 7);
                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] != 0) && ($.inArray(board[index + 9], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 9);
                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 9);
                }
                if (index - 8 > 1 && board[index - 8] == 0) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 8);
                }
                if (index - 8 > 1 && board[index - 8] != 0 && ($.inArray(board[index + 8], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 8);
                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] != 0) && ($.inArray(board[index - 7 ], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 7);
                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 7);

                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] != 0) && ($.inArray(board[index - 9], piecesBlack) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 9);
                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 9);
                }
            }
            //rey negro
            if (kingBlack == board[index]) {
                if (index + 1 < 65 && board[index + 1] == 0 && ((index) % 8 != 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 1);
                }
                if (index + 1 < 65 && board[index + 1] != 0 && ($.inArray(board[index + 1], piecesWhite) != -1) && ((index) % 8 != 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 1);
                }
                if (index - 1 > 1 && board[index - 1 ] == 0 && ((index) % 8 != 1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 1);
                }
                if (index - 1 > 1 && board[index - 1] != 0 && ($.inArray(board[index - 1], piecesWhite) != -1) && ((index) % 8 != 1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 1);
                }
                if (index + 8 < 65 && board[index + 8] == 0) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 8);
                }
                if (index + 8 < 65 && board[index + 8] != 0 && ($.inArray(board[index + 8], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 8);
                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 7);
                }
                if (index + 7 < 65 && ((index) % 8 != 1) && (board[index + 7] != 0) && ($.inArray(board[index + 7], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 7);
                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] != 0) && ($.inArray(board[index + 9], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 9);
                }
                if (index + 9 < 65 && ((index) % 8 != 0) && (board[index + 9] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index + 9);
                }
                if (index - 8 > 1 && board[index - 8] == 0) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 8);
                }
                if (index - 8 > 1 && board[index - 8] != 0 && ($.inArray(board[index + 8], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 8);
                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] != 0) && ($.inArray(board[index - 7 ], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 7);
                }
                if (index - 7 > 1 && ((index) % 8 != 0) && (board[index - 7] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 7);
                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] != 0) && ($.inArray(board[index - 9], piecesWhite) != -1)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 9);
                }
                if (index - 9 > 1 && ((index) % 8 != 1) && (board[index - 9] == 0)) {
                    movesVirtual[movesVirtual.length] = parseInt(index - 9);
                }
            }

            return movesVirtual;
            }

        /*returns true if the king can move there without being eaten*/
        function canKingMoveThere(index)
            {
            var oldValue = board[index];
            var oldPosKing = getKing();
            var oldKingValue = board[oldPosKing];

            board[index] = board [oldPosKing];
            board[oldPosKing] = 0;
            var checkedNewPosition = kingIsCheckedVirtual();

            board[oldPosKing] = oldKingValue;
            board[index] = oldValue;

            return !checkedNewPosition;

            }

        /*shows all moves in the board*/
        function showMoves(index)
            {

            UnFocusAllHighlighted();

            var moves = getMoves(index);
            for (var i = 0; i < moves.length; i++) {
                var tdId = "#" + parseInt(moves[i]);
                var tdSource = "#" + parseInt(index);
                $(tdId).css("background", "yellow");
                $(tdId).addClass("possibleMove");
                $(tdSource).css("font-weight", "bold");
                $(tdSource).css("color", "green");
                $(tdSource).addClass("sourceMove");
            }

            }

        /*returns king position*/
        function getKing()
            {
            var piece = kingWhite;
            if (!white)
                piece = kingBlack;

            return $.inArray(piece, board);

            }

        /*returns king position in the next move*/
        function getNextKing()
            {
            var piece = kingWhite;
            if (white)
                piece = kingBlack;

            return $.inArray(piece, board);

            }

        /*focus blacks*/
        function focusAllBlacks()
            {
            UnFocusAllHighlighted();
            if (kingIsChecked()) {
                var tdId = "#" + getKing();
                $(tdId).css("font-weight", "bold");
                $(tdId).css("color", "green");
                $(tdId).addClass("highlighted_king");

                $("#legend").html("black king checked: move the king!!");

            } else {
                var blacks = getAllBlacksFilled();
                for (var i = 0; i < blacks.length; i++) {
                    if (getMoves(blacks[i]).length > 0) {
                        var tdId = "#" + blacks[i];
                        $(tdId).css("font-weight", "bold");
                        $(tdId).css("color", "blue");
                        $(tdId).addClass("highlighted");
                    }
                }

                $("#legend").html("blacks move");
            }

            }

        /*focus whites*/
        function focusAllWhites()
            {
            UnFocusAllHighlighted();
            if (kingIsChecked()) {
                var tdId = "#" + getKing();
                $(tdId).css("font-weight", "bold");
                $(tdId).css("color", "blue");
                $(tdId).addClass("highlighted_king");
                $("#legend").html("white king checked: move the king!!");
            } else {
                var whites = getAllWhitesFilled();
                for (var i = 0; i < whites.length; i++) {
                    if (getMoves(whites[i]).length > 0) {
                        var tdId = "#" + whites[i];
                        $(tdId).css("font-weight", "bold");
                        $(tdId).css("color", "red");
                        $(tdId).addClass("highlighted");
                    }
                }

                $("#legend").html("whites move");
            }
            }

        function getAllBlacksFilled()
            {
            var blacksFilled = [];
            for (var i = 1; i <= 64; i++) {
                if ($.inArray(board[i], piecesBlack) != -1) {

                    blacksFilled[blacksFilled.length] = i;
                }
            }
            return blacksFilled;
            }

        function getAllWhitesFilled()
            {
            var whitesFilled = [];
            for (var i = 1; i <= 64; i++) {
                if ($.inArray(board[i], piecesWhite) != -1) {

                    whitesFilled[whitesFilled.length] = i;
                }
            }
            return whitesFilled;
            }

        function finished()
            {
            $("#legend").html("Finished");
            }

        function nextMove()
            {
            if (kingIsNotDead() && kingIsNotMated() && iterations < 1000) {
                kingIsDead = false;
                if (white) {
                    focusAllWhites();
                    white = false;
                }
                else {
                    focusAllBlacks();
                    white = true;
                }
                iterations++;
            }
            else {
                finished();
            }
            }

        /*events*/
        $('body').on('click', '.highlighted', function()
        {

            showMoves(parseInt($(this).attr("id")));
            if (noPossibleMove()) {
                $("#legend").html("not possible to move");
                focusAgain();
            }
        });

        $('body').on('click', '.highlighted_king', function()
        {

            showMoves(parseInt($(this).attr("id")));
            if (noPossibleMove()) {
                $("#legend").html("not possible to move");
                focusAgain();
            }
        });

        $('body').on('click', '.sourceMove', function()
        {
            $(".sourceMove").removeClass("sourceMove");

            $(".possibleMove").css("background", "#DDD");
            $(".possibleMove").removeClass("possibleMove");
            focusAgain();

        });

        $('body').on('click', '.possibleMove', function()
        {
            var idSource = parseInt($("body").find(".sourceMove").attr("id"));
            var idDestiny = parseInt($(this).attr("id"));
            board[idDestiny] = board[idSource];
            board[idSource] = 0;

            deleteMarkers(idDestiny);
            drawBoard();
            nextMove();
        });

        /*here is the game going on*/
        resetBoard();
        nextMove();

    }

)
;