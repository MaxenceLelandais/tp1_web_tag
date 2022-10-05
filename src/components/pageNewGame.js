import { refreshCanvas } from "./canvas.js";

export function pageNewGame() {

    return $('<div id="newGame"></div>')
        .append(
            $('<div></div>')
            .append(
                $('<input id="sizeMap" value ="50" min="10" max="200" type="range" step="2"></input>')
                .on('input', function() {
                    $('#size').text($(this).val() * 2 + ' x ' + $(this).val() + ' tiles')
                })
                .ready( function () {
                    $('#size').text(50 * 2 + ' x ' + 50 + ' tiles');
                    }
                )
            )
            .append(
                $('<label id="size"></label>')
            )
        )            
        .append(
            $('<button>Génération</button>')
                .on('click', function() {
                    refreshCanvas(400, true);
                })
            )
        .append(
            $('<button>Valider</button>')
            .on('click', function() {
                refreshCanvas(-1, $('sizeMap').val() * 2, $('sizeMap').val(), false);
                $('newGame').innerHTML = '';
            })
        );
}