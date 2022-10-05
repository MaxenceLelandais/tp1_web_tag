import { PLAYER } from "../data/sprite.js";
import { refreshCanvas } from "./canvas.js";

export function pageNewGame() {

    return $('<div id="newGame"></div>')
        .append($('<div></div>')
            .append(initPlayer('player1', 'player2'))
            .append(initPlayer('player2', 'player1'))
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

function initPlayer(idPlayer1, idPlayer2){
    return $('<div class ="player"></div>')
            
                .attr('id', idPlayer1)
                .append($('<label></label>').text(idPlayer1))
                .append($('<div></div>')
                    .append($('<img></img>')
                            .attr('id', idPlayer1 + 'Image')
                            .attr('src', PLAYER.listClass.src + 'defaultPreview'+ PLAYER.listClass.type)
                            )
                    .append($('<div></div>')
                        .append($('<label>nom : </label>'))
                        .append($('<input></input>').attr('id', idPlayer1+'Nom'))
                    )
                )
                .append($('<label>Classes : </label>').attr('id', idPlayer1+'Class'))
                .append(drawGrid(idPlayer1, idPlayer2))
            
            .append($('<label>Spécificité : </label>').attr('id', idPlayer1+'ClassLegend'))
            
}

function drawGrid(idPlayer1, idPlayer2){
    const grid = $('<div class="grid"></div>');

    PLAYER.listClass.list.forEach( className => {
        grid.append($('<button></button>')
                    .addClass(idPlayer1+'Button')
                    .attr('id', idPlayer1+className)
                    .append($('<img></img>').attr('src', PLAYER.listClass.src + className + 'Preview'+ PLAYER.listClass.type))
                    .on('click', function() {
                        $('#'+idPlayer1+'ClassLegend').text('Spécificité : '+PLAYER.listClass[className].effectsText);
                        $('#'+idPlayer1+'Image').attr('src',PLAYER.listClass.src + className + 'Preview'+ PLAYER.listClass.type)
                        $('.selected'+idPlayer1).removeClass('selected'+idPlayer1); // del all 'selected' class
                        $(this).addClass('selected'+idPlayer1);
                        $('.'+idPlayer2+'Button').removeAttr('disabled');
                        $('#'+idPlayer2+className).attr('disabled', true)
                    })
        )
    })
    return grid;
}