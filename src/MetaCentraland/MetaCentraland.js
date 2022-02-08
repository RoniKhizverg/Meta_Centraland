import React from "react";
import './MetaCentraland.css'

export default class MetaCentraland extends React.Component {


    render() {
        MetaCentralandMap();

    };
}



var Board = function MetaCentralandMap() {;
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
    return Board();
}