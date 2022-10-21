import $ from 'jquery';
import Character from './character.js';


/**
 * Cette classe gère le jeu.
 * Elle créait les joueurs, les affiches et interagie avec.
 * Elle s'occupe aussi du décompte et gère la victoire.
 */
export class Game {
  /**
    * Initialise le jeu
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

    const player1 = new Character('player1');
    const player2 = new Character('player2');

    this.listeJoueur = [player1, player2];
    this.touche = false;

    player1.setPlayerClass($('#player1Class').text());
    player2.setPlayerClass($('#player2Class').text());

    $('body').append(this.showInformationsGame(player1Name, player2Name));
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
    * Cette fonction est appellé par les joueurs s'il se touchent.
    * Change le joueur chasseur, freez le nouveau chasseur et
    * rend invulnérable l'ancient chasseur pour éviter tous contact.
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
            .text('60.00 s.'),
        )
        .append($('<br>'))
        .append($('<label></label>')
            .text(player2Name + ', votre temps de vie est de :'),
        )
        .append($('<label></label>')
            .attr('id', 'tempsPlayer2')
            .text('60.00 s.'),
        );
  }

  /**
   * Il s'occupe du temps.
   * Soustrait le temps de vie au joueur chasseur,
   * gère le délais de 2 secondes pour unfreez et
   * rendre l'ancient chasseur vulnérable aux contacts.
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
      $('#tempsPlayer' + ((this.player + 2) % 3)).css('color', 'black');
      $('#tempsPlayer' + (this.player + 1)).css('color', 'red');
      if (this.delay <= 0) {
        this.listeJoueur[this.player].unFreez();
        this.listeJoueur[(this.player + 1) % 2].vulnerabilite();
        this.touche = false;
      }
    }

    setTimeout(() => {
      window.requestAnimationFrame(() => this.timer(this.player));
    }, 100);
  }
}
