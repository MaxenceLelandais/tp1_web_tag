import $ from 'jquery';
import {PLAYER} from '../data/sprite.js';
import {enregistrerScore} from '../model/score.js';
import Character from './character.js';
import {tableauMeilleurScore} from './leaderboard.js';


/**
 * Cette classe gère le jeu.
 * Elle créait les joueurs, les affiches et interagie avec.
 * Elle s'occupe aussi du décompte et gère la victoire.
 */
export class Game {
  /**
    * Initialise le jeu.
    * @param {*} tileMap
    */
  constructor(tileMap) {
    this.tileMap = tileMap;
    this.player = parseInt(Math.ceil(Math.random() - 0.5));
    this.initialization();
  }

  /**
   * Initialise les joueurs, leurs classes, leur point de spawn,
   * le joueur attaquant et le décompte.
   */
  initialization() {
    const player1Name = $('#player1Nom').val() != '' ?
      $('#player1Nom').val() : 'Player1';
    const player2Name = $('#player2Nom').val() != '' ?
      $('#player2Nom').val() : 'Player2';

    const player1 = new Character(player1Name);
    const player2 = new Character(player2Name);

    this.listeJoueur = [player1, player2];
    this.touche = false;

    player1.setPlayerClass($('#player1Class').text());
    player2.setPlayerClass($('#player2Class').text());

    $('#map').append(this.showInformationsGame(player1Name, player2Name));
    $('#map').append(player1.setCanvas('randomPosition'));
    $('#map').append(player2.setCanvas('randomPosition'));

    player1.setData(this.tileMap.map, this.tileMap.tileSize);
    player2.setData(this.tileMap.map, this.tileMap.tileSize);
    player1.setTracker(this, player2);
    player2.setTracker(this, player1);

    this.listeJoueur[this.player].bomber = true;
    $('#tempsPlayer' + (this.player + 1)).css('color', 'red');
    this.timer();
  }

  /**
    * Cette fonction est appelée par les joueurs s'ils se touchent.
    * Change le joueur chasseur, freez le nouveau chasseur et
    * rend invulnérable l'ancien chasseur pour éviter tous contacts.
    * Initialise le temps de freez et l'invulnérabilité à 2 secondes.
    * @param {*} nbr
    */
  changePlayer() {
    this.player = (this.player + 1) % 2;
    this.delay = 2000;
    this.touche = true;
    this.listeJoueur[this.player].freez();
    this.listeJoueur[(this.player + 1) % 2].invulnerabilite();
    this.listeJoueur[this.player].bomber = true;
    this.listeJoueur[(this.player + 1) % 2].bomber = false;
  }

  /**
    * Affiche les décomptes de chaque joueur.
    * @param {*} player1Name
    * @param {*} player2Name
    * @return {Object}
    */
  showInformationsGame(player1Name, player2Name) {
    return $('<div></div>')
        .addClass('informationsGame')
        .css('text-align', 'center')
        .append($('<label></label>')
            .text(player1Name + ', votre temps de vie est de :'),
        )
        .append($('<label></label>')
            .attr('id', 'tempsPlayer1')
            .text(PLAYER.timer+'.00 s.'),
        )
        .append($('<br>'))
        .append($('<label></label>')
            .text(player2Name + ', votre temps de vie est de :'),
        )
        .append($('<label></label>')
            .attr('id', 'tempsPlayer2')
            .text(PLAYER.timer+'.00 s.'),
        );
  }

  /**
   * Affiche le joueur gagnant et son score.
   * @param {*} playerName
   * @param {*} score
   * @return {Object}
   */
  showWin(playerName, score) {
    return $('<div></div>')
        .addClass('conclusionGame')
        .css('text-align', 'center')
        .append($('<label></label>')
            .text('WIN de ' + playerName + ' !!!!!!'),
        )
        .append('<br>')
        .append($('<label></label>')
            .text('Avec un super score de ' + score + ' points.'),
        )
        .append('<br>')
        .append($('<button></button>')
            .addClass('btn btn-success')
            .text('Go leaderboard')
            .on('click', ()=>{
              enregistrerScore(playerName, score);
              $('#map').remove();
              $('body').append(tableauMeilleurScore());
            }),
        )
    ;
  }

  /**
   * Il s'occupe du temps.
   * Soustrait le temps de vie au joueur chasseur,
   * gère le délai de 2 secondes pour unfreez et
   * rends l'ancien chasseur vulnérable aux contacts.
   * @param {*} player
   */
  timer() {
    $('#tempsPlayer' + (this.player + 1))
        .text(
            (parseInt(
                $('#tempsPlayer' + (this.player + 1))
                    .text().split(' ')[0] * 100) - 10
            ) / 100 +
        ' s.',
        );

    if (this.touche) {
      this.delay -= 100;
      if (this.player===1) {
        $('#tempsPlayer1').css('color', 'black');
        $('#tempsPlayer2').css('color', 'red');
      } else {
        $('#tempsPlayer1').css('color', 'red');
        $('#tempsPlayer2').css('color', 'black');
      }
      if (this.delay <= 0) {
        this.listeJoueur[this.player].unFreez();
        this.listeJoueur[(this.player + 1) % 2].vulnerabilite();
        this.touche = false;
      }
    }

    if ($('#tempsPlayer' + (this.player + 1)).text().split(' ')[0]*100 <=0) {
      if (this.player===0) {
        $('#map')
            .append(
                this.showWin(
                    this.listeJoueur[1].player,
                    $('#tempsPlayer2').text().split(' ')[0]*100,
                ),
            );
      } else {
        $('#map')
            .append(
                this.showWin(
                    this.listeJoueur[0].player,
                    $('#tempsPlayer1').text().split(' ')[0]*100,
                ),
            );
      }
      this.listeJoueur[0].animation = false;
      this.listeJoueur[1].animation = false;
    } else {
      setTimeout(() => {
        window.requestAnimationFrame(() => this.timer(this.player));
      }, 100);
    }
  }
}
