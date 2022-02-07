        var board = $('#board');
        var spot = $('.spot');
        const rows = 200;
        const column = 200;
        let num;

        function getRandomInt(max) {
            let num =
                Math.floor(Math.random() * max);

            return num.toString();

        }

        var Board = function() {
            var count = 0;
            for (var i = 0; i < 80; i++) {
                for (var j = 0; j < 80; j++) {
                    num = getRandomInt(4);

                    if (num == 0) {
                        board.append('<div class="spot"></div>');
                        $('.spot').eq(count).addClass("road");
                    } else if (num == 1) {
                        board.append('<div class="spot" "></div>');
                        $('.spot').eq(count).addClass("park");
                    } else if (num == 2) {
                        board.append('<div class="spot"></div>');
                        $('.spot').eq(count).addClass("empty");
                    } else if (num == 3) {
                        board.append('<div class="spot"></div>');
                        $('.spot').eq(count).addClass("plot");
                    }
                    $('.spot').eq(count).attr("pos", rows[rows.length - (i + 1) + column[j]])
                    count++;

                }
            }


        }



        $(document).ready(function() {
            Board();
        })