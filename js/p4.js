(function ($) {
    $.fn.p4 = function () {
        this.append("<div id='puiss'><h1>Puissance Quatre</h1></div");
        this.append("<div id='textbox'></div>");
        this.append("<div id='puissance4'></div>");
        this.after("<button id='replay'>Play again?</button>");
        this.after("<button id='rules'>Rules</button>");

        class Puissance4 { //Create grid
            constructor(selector) {
                // this.ROWS = 6;
                // this.COLS = 7;
                this.ROWS = prompt("Number of rows");
                this.COLS = prompt("Number of cols");
                this.player = prompt("Who's gonna be the first? Red or Yellow?"); //Player Red
                // this.player = "red"; //Player Red
                this.selector = selector;
                this.createGrid();
                this.setupEvent();
            }

            createGrid() { //Loop over every row a div Columns & Line
                const $board = $(this.selector);
                for (let row = 0; row < this.ROWS; row++) {
                    const $row = $('<div>')
                        .addClass('row'); //Add class to the div
                    for (let col = 0; col < this.COLS; col++) {
                        const $col = $('<div>')
                            .addClass('col empty')
                            .attr('data-col', col) //Set attribut Col & Row index, use to grab the elements
                            .attr('data-row', row);
                        $row.append($col);
                    }
                    $board.append($row);
                }
            }

            setupEvent() {
                const $board = $(this.selector);
                const that = this;

                function findLastEmptyCell(col) {
                    const cells = $(`.col[data-col='${col}']`);
                    //We grab the last one
                    for (let i = cells.length - 1; i >= 0; i--) { //Loop over all these cells, backwards
                        const $cell = $(cells[i]);
                        if ($cell.hasClass('empty')) {
                            return $cell;
                        }
                    }
                    return null;
                }

                $board.on('mouseenter', '.col.empty', function () {
                    const col = $(this).data('col');
                    const $lastEmptyCell = findLastEmptyCell(col);
                    $lastEmptyCell.addClass(`hover-${that.player}`) //Add the hover of the differents player
                });

                $board.on('mouseleave', '.col', function () { //Remove the event of Moveenter on all col
                    $('.col').removeClass(`hover-${that.player}`);
                });

                $board.on('click', '.col.empty', function () {
                    const col = $(this).data('col'); // We know what collum or row we click on
                    const row = $(this).data('row');
                    var n = $('.empty').length; //Calcul the number of class who has "empty"

                    const $lastEmptyCell = findLastEmptyCell(col);
                    $lastEmptyCell.removeClass(`empty hover-${that.player}`); //Remove the class empty and then
                    $lastEmptyCell.addClass(that.player); //Place a new classe call red or yellow with the hover

                    //EFFECT
                    $(".empty").click(function () {
                        $(".col.red").fadeTo(250, 0.8);
                    });
                    $(".empty").click(function () {
                        $(".col.yellow").fadeTo(250, 0.8);
                    });

                    //If empty equal 1 then it's a draw
                    if (n === 1) {
                        alert('Draw ! Click on "Play again ?"');
                    }

                    //CHANGE THE COLOR DEPEND OF THE PLAYER
                    that.player = (that.player === "red") ? 'yellow' : 'red';

                    //Show the player's turn
                    if (that.player === "red") {
                        $("#textbox").html("<p id='pred'>Player " + that.player + " turn !</p>");
                    } else {
                        $("#textbox").html("<p id='pyellow'>Player " + that.player + " turn !</p>");
                    }
                    $(this).trigger('mouseenter'); //Keep the hover when place a new piece
                });

                //RESET LA PAGE
                $("#replay").click(function () {
                    location.reload();
                });

                //RULES
                $("#rules").click(function () {
                    alert("Hello ! Welcome to my 'Puissance Quatre'\n\nThe rules are simples! :\n\nThe aim for both players is to make a straight line of four own pieces; the line can be vertical, horizontal or diagonal.\n\nGood Luck !");
                });

                //POSITION TAKEN
                $board.on("click", ".col.red", function () {
                    alert("Already taken, choose an another emplacement !");
                    return;
                });

                $board.on("click", ".col.yellow", function () {
                    alert("Already taken, choose an another emplacement !");
                    return;
                });
            }
        }
        //Call the class
        $puiss4 = new Puissance4('#puissance4');
    }
})(jQuery);