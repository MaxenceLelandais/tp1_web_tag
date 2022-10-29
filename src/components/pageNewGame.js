/* eslint-disable no-invalid-this */
import $ from 'jquery';
import {PLAYER} from '../data/sprite.js';
import Character from './character.js';
import {canvas, refreshCanvas} from './mapGame.js';
import {Game} from './game.js';

/**
 * Cette fonction génère la page permettant à l'utilisateur
 * de sélectionner les joueurs et de générer la map avant de jouer.
 * @return {Object}
 */
export function pageNewGame() {
  return $('<div></div>') /* .fadeIn('slow') */
      .addClass('containerMaster')
      .append($('<div></div>')
          .addClass('container')
          .attr('id', 'newGame')
          .append($('<div></div>')
              .append(initPlayer('player1', 'player2', 1))
              .append(initPlayer('player2', 'player1', 2)),
          )
          .append(
              $('<div></div>')
                  .addClass('input-group justify-content-center mb-3')
                  .append(
                      $('<input min="50" value ="50" max="1000"></input>')
                          .addClass('slider-width100')
                          .attr('id', 'sizeMap')
                          .attr('step', '2')
                          .attr('type', 'range')
                          .on('input', function() {
                            $('#size').text(
                                $(this).val() * 2 +
                                ' x ' +
                                $(this).val() +
                                ' tiles',
                            );
                            $('#validate').hide();
                          })
                          .ready(function() {
                            $('#size').text(50 * 2 + ' x ' + 50 + ' tiles');
                          }),
                  )
                  .append(
                      $('<label></label>')
                          .addClass('input-group-text')
                          .attr('id', 'size'),
                  ),
          )
          .append(
              $('<input type="checkbox">Animer la génération? </input>')
                  .attr('id', 'animeGeneration'),
          )
          .append(
              $('<button>Génération</button>')
                  .addClass('btn btn-primary')
                  .on('click', () => {
                    $('#canvasMap').css('background-color', 'rgb(0, 153, 250)');
                    $('.player2Button').attr('disabled', true);
                    $('.player1Button').attr('disabled', true);
                    $('#validate').show();
                    refreshCanvas(400, true, false);
                  }),
          )
          .append(
              $('<button>Valider</button>')
                  .addClass('btn btn-success')
                  .attr('id', 'validate')
                  .hide()
                  .on('click', () => {
                    $('body').css('overflow', 'hidden');
                    $('#canvasMap').addClass('mapGame');
                    const tileMap = refreshCanvas(
                        -1, false, true,
                    );
                    new Game(tileMap);

                    $('#newGame').remove();
                  }),
          ),
      )
      .append(canvas());
}

/**
 * Créer l'affichage des données du joueur (nom, classe, visuel du joueur).
 * @param {*} idPlayer1
 * @param {*} idPlayer2
 * @param {*} id
 * @return {Object}
 */
function initPlayer(idPlayer1, idPlayer2, id) {
  const character = new Character(idPlayer1, id);
  character.sizeMulti = 2;

  return $('<div></div>')
      .addClass('player')
      .attr('id', idPlayer1)
      .append($('<div class="text-center"></div>')
          .append(character.returnCommandList())
          .append(character.setCanvas())
          .append($('<div></div>')
              .addClass('input-group')
              .append(
                  $('<label></label>')
                      .addClass('input-group-text')
                      .attr('id', 'basic-addon1')
                      .text(idPlayer1),
              )
              .append(
                  $('<input placeholder="Nom" lenght="20"></input>')
                      .addClass('form-control')
                      .attr('id', idPlayer1 + 'Nom'),
              ),
          ),
      )
      .append(
          $('<label>default</label>')
              .addClass('input-group-text justify-content-center')
              .attr('id', idPlayer1 + 'Class'),
      )
      .append(drawGrid(character, idPlayer1, idPlayer2))
      .append(
          $('<label>Caractéristiques : </label>')
              .addClass('input-group-text justify-content-center'),
      )
      .append(
          $('<table></table>')
              .addClass('table')
              .attr('id', idPlayer1 + 'ClassLegend')
              .append($('<thead></thead>')
                  .append($('<tr></tr')
                      .append($('<th scope="col">Type de case</th>'))
                      .append($('<th scope="col">Vitesse sur cette case</th>')),
                  ),
              ),
      );
}

/**
 * Charge là les classes sur des boutons.
 * Chaque bouton modifie son état, le label classe et l'image du personnage.
 * @param {*} character
 * @param {*} idPlayer1
 * @param {*} idPlayer2
 * @return {Object}
 */
function drawGrid(character, idPlayer1, idPlayer2) {
  const grid = $('<div></div>').addClass('grid');

  PLAYER.listClass.list.forEach((className) => {
    grid.append(
        $('<button></button>')
            .addClass(idPlayer1 + 'Button')
            .attr('id', idPlayer1 + className)
            .append(
                $('<img></img>')
                    .attr(
                        'src',
                        PLAYER.listClass.src +
                        className +
                        'Preview' +
                        PLAYER.listClass.type,
                    ),
            )

            .on('click', function() {
              $('#' + idPlayer1 + 'Class').text(className);
              loadClassEffectsList(
                  idPlayer1 + 'ClassLegend',
                  PLAYER.listClass[className],
              );
              $('#' + idPlayer1 + 'Image')
                  .attr(
                      'src',
                      PLAYER.listClass.src +
                      className +
                      'Preview' +
                      PLAYER.listClass.type,
                  );
              $('.selected' + idPlayer1).removeClass('selected' + idPlayer1);
              $(this).addClass('selected' + idPlayer1);
              $('.' + idPlayer2 + 'Button').removeAttr('disabled');
              $('#' + idPlayer2 + className).attr('disabled', true);
              character.setPlayerClass(className);
            }),
    );
  });
  return grid;
}

/**
 * Quand une classe est sélectionnée,
 * la fonction affiche les bonus et les malus dans le tableau
 * en dessous des classes.
 * @param {*} id
 * @param {*} playerClass
 * @return {Object}
 */
function loadClassEffectsList(id, playerClass) {
  $('#tbody' + id).remove();
  return $('#' + id)
      .append($('<tbody></tbody>')
          .attr('id', 'tbody' + id)
          .ready(function() {
            Object.keys(playerClass.effectsList).forEach(function(effect) {
              $('#tbody' + id).append($('<tr></tr>')
                  .append($('<td></td>').text(effect))
                  .append($('<td></td>').text(
                      PLAYER.initSpeed +
                      playerClass.effectsList[effect]),
                  ),
              );
            });
          }),
      );
}
