/**
 * Created by dgutierrez-diez on 30.06.14.
 */

requirejs(['jquery', 'jquery_ui'], function($, $ui)
    {
        kingIsDead = false;

        white = true;

        moved = false;

        iterations = 0;

        piecesNames = [  "pawnwhite" , "rookwhite", "nightwhite", "bishopwhite", "kingwhite", "wifewhite", "bishopwhite", "nightwhite" , "rookwhite", "rookblack", "nightblack", "bishopblack", "kingblack", "queenblack", "bishopblack", "nightblack", "rookblack", "pawnblack"    ];

        piecesWhite = [  "&#9817", "&#9814", "&#9816", "&#9815", "&#9813", "&#9812", "&#9815", "&#9816", "&#9814" ];

        piecesBlack = [   "&#9820", "&#9822", "&#9821", "&#9819", "&#9818", "&#9821", "&#9822", "&#9820", "&#9823" ];

        board = [0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0];

        function resetBoard()
            {
            for (i = 1; i <= 8; i++) {
                board [i] = piecesWhite[i];
            }
            for (i = 9; i <= 16; i++) {
                board [i] = piecesWhite[0];
            }

            for (j = 64, i = 0; j > 56; j--, i++) {
                board [j] = piecesBlack[i];
            }

            for (j = 56; j > 48; j--) {
                board [j] = piecesBlack[8];
            }

            for (i = 1; i <= 64; i++) {
                if (board[i] != 0) {
                    tdId = "#" + i;
                    $(tdId).html(board[i]);
                }
            }

            };

        function drawBoard()
            {

            for (i = 1; i <= 64; i++) {
                if (board[i] != 0) {
                    tdId = "#" + i;
                    $(tdId).html(board[i]);
                } else {
                    tdId = "#" + i;
                    $(tdId).html("");
                }
            }
            }

        function kingIsChecked()
            {

            oponents = [];
            if (!white) {
                oponents = getAllWhitesFilled();
                king = $.inArray(piecesBlack[4], board);
            } else {
                oponents = getAllBlacksFilled();
                king = $.inArray(piecesWhite[5], board);
            }
            for (i = 0; i < oponents.length; i++) {
                oponentMoves = getMoves(oponents[i]);
                if ($.inArray(king, oponentMoves) != -1) {
                    return true;
                }
            }
            return false;
            }

        function kingIsNotMated()
            {
            if (kingIsChecked()) {
                console.log("checked");
            }
            return true;

            }

        function kingIsNotDead()
            {
            if (!white)
                kingIsDead = $.inArray(piecesBlack[4], board) == -1;
            else
                kingIsDead = $.inArray(piecesWhite[5], board) == -1;

            return !kingIsDead;
            }

        function UnFocusAllHighlighted()
            {
            $(".highlighted").css("font-weight", "normal");
            $(".highlighted").css("color", "#000");
            $(".highlighted").removeClass("highlighted");
            }

        $('body').on('click', '.highlighted', function()
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

        function focusAgain()
            {
            if (!white)
                focusAllWhites();
            else
                focusAllBlacks();
            }

        $('body').on('click', '.possibleMove', function()
        {
            idSource = parseInt($("body").find(".sourceMove").attr("id"));
            idDestiny = parseInt($(this).attr("id"));
            board[idDestiny] = board[idSource];
            board[idSource] = 0;

            deleteMarkers();
            drawBoard();
            nextMove();
        });

        function noPossibleMove()
            {
            return ($('body').find(".possibleMove").length) == 0;
            }

        function deleteMarkers()
            {
            $(".sourceMove").removeClass("sourceMove");
            $(".possibleMove").css("background", "red");
            $(".possibleMove").removeClass("possibleMove");

            }

        function getMoves(index)
            {
            moves = [];
            if (piecesWhite[0] == board[index]) {
                if (board[index + 8] == 0) {
                    moves[moves.length] = parseInt(index + 8);

                }
                if (((index) % 8 != 1) && (board[index + 7] != 0) && ($.inArray(board[index + 7], piecesBlack) != -1)) {
                    moves[moves.length] = parseInt(index + 7);

                }
                if (((index) % 8 != 0) && (board[index + 9] != 0) && ($.inArray(board[index + 9], piecesBlack) != -1)) {
                    moves[moves.length] = parseInt(index + 9);

                }

            }

            if (piecesBlack[8] == board[index]) {
                if (board[index - 8] == 0) {
                    moves[moves.length] = parseInt(index - 8);

                }
                if (((index) % 8 != 0) && (board[index - 7] != 0) && ($.inArray(board[index - 7 ], piecesWhite) != -1)) {
                    moves[moves.length] = parseInt(index - 7);

                }
                if (((index) % 8 != 1) && (board[index - 9] != 0) && ($.inArray(board[index - 9], piecesWhite) != -1)) {
                    moves[moves.length] = parseInt(index - 9);

                }

            }
            return moves;
            }

        function showMoves(index)
            {

            UnFocusAllHighlighted();

            moves = getMoves(index);
            for (i = 0; i < moves.length; i++) {
                tdId = "#" + parseInt(moves[i]);
                tdSource = "#" + parseInt(index);
                $(tdId).css("background", "yellow");
                $(tdId).addClass("possibleMove");
                $(tdSource).css("font-weight", "bold");
                $(tdSource).css("color", "green");
                $(tdSource).addClass("sourceMove");
            }

            }

        function focusAllBlacks()
            {
            UnFocusAllHighlighted();
            if (kingIsChecked()) {

                $("#legend").html("black king checked: move the king!!");

            } else {
                blacks = getAllBlacksFilled();
                for (i = 0; i < blacks.length; i++) {
                    if (getMoves(blacks[i]).length > 0) {
                        tdId = "#" + blacks[i];
                        $(tdId).css("font-weight", "bold");
                        $(tdId).css("color", "blue");
                        $(tdId).addClass("highlighted");
                    }
                }

                $("#legend").html("blacks move");
            }

            }

        function focusAllWhites()
            {
            UnFocusAllHighlighted();
            if (kingIsChecked()) {

                $("#legend").html("white king checked: move the king!!");
            } else {
                whites = getAllWhitesFilled();
                for (i = 0; i < whites.length; i++) {
                    if (getMoves(whites[i]).length > 0) {
                        tdId = "#" + whites[i];
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
            blacksFilled = [];
            for (i = 1; i <= 64; i++) {
                if ($.inArray(board[i], piecesBlack) != -1) {

                    blacksFilled[blacksFilled.length] = i;
                }
            }
            return blacksFilled;
            }

        function getAllWhitesFilled()
            {
            whitesFilled = [];
            for (i = 1; i <= 64; i++) {
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

        /*here is the game going on*/
        resetBoard();
        nextMove();

    }

)
;