import { PLAYER } from "../data/sprite.js";
import { refreshCanvas } from "./canvas.js";

export function pageNewGame() {

    return $('<div id="newGame"></div>')
        .append($('<div class="grid"></div>')
            .append(initPlayer('player1'))
            .append(initPlayer('player2'))
        )
        .append(
            $('<div></div>')
            .append(
                $('<input id="sizeMap" value ="50" min="10" max="200" type="range" step="2"></input>')
                .on('input', () => $('#size').text($(this).val() * 2 + ' x ' + $(this).val() + ' tiles'))
                .ready( () => $('#size').text(50 * 2 + ' x ' + 50 + ' tiles'))
            )
            .append($('<label id="size"></label>'))
        )            
        .append(
            $('<button>Génération</button>')
                .on('click', () => refreshCanvas(400, true))
            )
        .append(
            $('<button>Valider</button>')
            .on('click', () => {
                refreshCanvas(-1, $('sizeMap').val() * 2, $('sizeMap').val(), false);
                $('newGame').innerHTML = '';
            })
        );
}

function initPlayer(idPlayer){
    return $('<div class = "player"></div>')
            .append($('<div></div>')
                .attr('id', idPlayer)
                .append($('<label></label>').text(idPlayer))
                .append($('<div></div>')
                    .append($('<img></img>')
                            .attr('id', idPlayer + 'Image')
                            .attr('src', PLAYER.listClass.src + 'defaultPreview'+ PLAYER.listClass.type)
                            )
                    .append($('<div></div>')
                        .append($('<label>nom : </label>'))
                        .append($('<input></input>').attr('id', idPlayer+'Nom'))
                    )
                )
                .append($('<label>Classes : </label>').attr('id', idPlayer+'Class'))
                .append(drawGrid(idPlayer))
            )
            .append($('<label>Spécificité : </label>').attr('id', idPlayer+'ClassLegend'))
            
}

function drawGrid(idPlayer){
    const grid = $('<div class="grid"></div>');

    PLAYER.listClass.list.forEach( className => {
        grid.append($('<button></button>')
                    .attr('id', idPlayer+className)
                    .append($('<img></img>').attr('src', PLAYER.listClass.src + className + 'Preview'+ PLAYER.listClass.type))
                    .on('click', () => {
                        $('#'+idPlayer+'ClassLegend').text('Spécificité : '+PLAYER.listClass[className].effectsText);
                        $('#'+idPlayer+'Image').attr('src',PLAYER.listClass.src + className + 'Preview'+ PLAYER.listClass.type)
                        $(this).attr('class', 'selected')
                    })
        )
    })
    return grid;
}