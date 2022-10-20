import $ from 'jquery';
import {PLAYER} from '../data/sprite.js';
import Character from './character.js';
import {refreshCanvas} from './mapGame.js';
import {canvas} from './mapGame.js';
import {Game} from './game.js';

/**
 *
 * @return {Object}
 */
export function pageNewGame() {
  return $('<div></div>')
      .css('text-align', 'center')
      .append($('<div id="newGame" class="container"></div>')

          .append($('<div></div>')
              .append(initPlayer('player1', 'player2'))
              .append(initPlayer('player2', 'player1')),
          )
          .append(
              $('<div class="input-group justify-content-center mb-3"></div>')
                  .append(
                      $('<input class="slider-width100" id="sizeMap" value ="50" min="10" max="200" type="range" step="2"></input>')
                          .on('input', function() {
                            $('#size').text($(this).val() * 2 + ' x ' + $(this).val() + ' tiles');
                          })
                          .ready(function() {
                            $('#size').text(50 * 2 + ' x ' + 50 + ' tiles');
                          }),
                  )
                  .append(
                      $('<label class="input-group-text" id="size"></label>'),
                  ),

          )
          .append(
              $('<button class="btn btn-primary">Génération</button>')
                  .on('click', () => {
                    $('.player2Button').attr('disabled', true);
                    $('.player1Button').attr('disabled', true);
                    $('#validate').show();
                    refreshCanvas(400, true);
                  }),
          )
          .append(
              $('<button class="btn btn-success" id="validate">Valider</button>')
                  .hide()
                  .on('click', () => {
                    $('body').css('overflow', 'hidden');
                    $('#canvasMap').addClass('mapGame');
                    const tileMap = refreshCanvas(
                        -1, $('sizeMap').val() * 2, $('sizeMap').val(), false,
                    );
                    new Game(tileMap);
                    $('#newGame').remove();
                  }),
          ),
      )
      .append(canvas());
}

/**
 *
 * @param {*} idPlayer1
 * @param {*} idPlayer2
 * @return {Object}
 */
function initPlayer(idPlayer1, idPlayer2) {
  const character = new Character(idPlayer1);
  return $('<div class ="player"></div>')

      .attr('id', idPlayer1)
      .append($('<div></div>')
          .append(character.setCanvas())
          .append($('<div class="input-group"></div>')
              .append($('<label class="input-group-text" id="basic-addon1"></label>').text(idPlayer1))
              .append($('<input class="form-control" placeholder="Nom" lenght="20"></input>').attr('id', idPlayer1+'Nom')),
          ),
      )
      .append($('<label class="input-group-text justify-content-center">default</label>').attr('id', idPlayer1+'Class'))
      .append(drawGrid(character, idPlayer1, idPlayer2))
      .append($('<label class="input-group-text justify-content-center">Caractéristiques : </label>'))
      .append($('<table class="table"></table>').attr('id', idPlayer1+'ClassLegend')
          .append($('<thead></thead>')
              .append($('<tr></tr')
                  .append($('<th scope="col">Type de case</th>'))
                  .append($('<th scope="col">Vitesse sur cette case</th>')),
              ),
          ),
      );
}

/**
 *
 * @param {*} character
 * @param {*} idPlayer1
 * @param {*} idPlayer2
 * @return {Object}
 */
function drawGrid(character, idPlayer1, idPlayer2) {
  const grid = $('<div class="grid"></div>');

  PLAYER.listClass.list.forEach( (className) => {
    grid.append($('<button></button>')
        .addClass(idPlayer1+'Button')
        .attr('id', idPlayer1+className)
        .append($('<img></img>').attr('src', PLAYER.listClass.src + className + 'Preview'+ PLAYER.listClass.type))
        .on('click', function() {
          $('#'+idPlayer1+'Class').text(className);
          loadClassEffectsList(idPlayer1+'ClassLegend', PLAYER.listClass[className]);
          $('#'+idPlayer1+'Image').attr('src', PLAYER.listClass.src + className + 'Preview'+ PLAYER.listClass.type);
          $('.selected'+idPlayer1).removeClass('selected'+idPlayer1);
          $(this).addClass('selected'+idPlayer1);
          $('.'+idPlayer2+'Button').removeAttr('disabled');
          $('#'+idPlayer2+className).attr('disabled', true);
          character.setPlayerClass(className);
        }),
    );
  });
  return grid;
}

/**
 *
 * @param {*} id
 * @param {*} playerClass
 * @return {Object}
 */
function loadClassEffectsList(id, playerClass) {
  $('#tbody'+id).remove();
  return $('#'+id)
      .append($('<tbody></tbody>')
          .attr('id', 'tbody'+id)
          .ready(function() {
            Object.keys(playerClass.effectsList).forEach(function(effect) {
              $('#tbody'+id).append($('<tr></tr>')
                  .append($('<td></td>').text(effect))
                  .append($('<td></td>').text(PLAYER.initSpeed + playerClass.effectsList[effect])),
              );
            });
          }),
      );
}
