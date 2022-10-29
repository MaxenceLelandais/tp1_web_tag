import $ from 'jquery';
import {MAP, PLAYER} from '../data/sprite.js';
import {checkSpawn, classEffects} from '../model/classEffects.js';

/**
 * Cette classe gère le joueur.
 * Elle s'occupe de son rôle, de sa vitesse, de sa classe,
 * de ses animations et de son affichage.
 */
export default class Character {
  stage = {};
  keysDown = {};
  sourceX = 1;
  sourceY = 2;
  timer = PLAYER.timer;
  sizeMulti = 1;
  vitesse = 0;
  positionX = 0;
  positionY = 0;
  player2 = 0;
  vul = true;
  bomber = false;
  animation = true;
  dontMove = false;

  /**
   * Initialise le joueur (taille et classe) et
   * ajoute une surveillance des touches du clavier.
   * @param {*} player
   * @param {*} nbr
   */
  constructor(player, nbr) {
    this.idPlayer = 'player'+nbr;
    this.player = player;
    this.stage.width = PLAYER.width;
    this.stage.height = PLAYER.height;
    this.setPlayerClass('default');

    $('body').on('keydown', (event) => {
      this.keysDown[event.key] = true;
    });

    $('body').on('keyup', (event) => {
      delete this.keysDown[event.key];
    });
  }

  /**
   * Récupère la map et les effets de sa classe.
   * @param {*} map
   * @param {*} tileSize
   */
  setData(map, tileSize) {
    this.map = map;
    this.tileSize = tileSize;
    this.effectList = PLAYER.listClass[this.playerClass].effectsList;
    this.reverseDictListTiles = MAP.reverseTiles(MAP.listTiles);
  }

  /**
   * Récupère la fonction de contact du jeu et le numéro de son adversaire.
   * @param {*} timer
   * @param {*} player2
   */
  setTracker(timer, player2) {
    this.timer = timer;
    this.player2 = player2;
  }

  /**
   * Change la classe du joueur et récupère les tuiles correspondantes.
   * @param {*} playerClass
   */
  setPlayerClass(playerClass) {
    this.playerClass = playerClass;
    this.img = new Image();
    this.img.src = PLAYER.listClass.src + this.playerClass +
      PLAYER.listClass.type;
  }

  /**
   * Met en évidence le joueur quand il est chasseur.
   */
  setBomb() {
    const ctx = $('#' + this.player + 'Canvas').get(0).getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(
        this.positionX + this.stage.width / 2,
        this.positionY + this.stage.height / 2,
        this.stage.height / 2 - ctx.lineWidth,
        0,
        2 * Math.PI,
    );

    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
  }

  /**
   * Retourne un text contenant la liste des touches pour
   * faire bouger le personnage.
   * @return {Object}
   */
  returnCommandList() {
    const listMouvement = ['Gauche', 'Droite', 'Haut', 'Bas'];
    let text = '';
    let post = 0;
    Object.keys(PLAYER[this.idPlayer].commands).forEach((command) => {
      text += listMouvement[post] + ' : ' + command + ', ';
      post ++;
    });
    return $('<div></div>').text(text);
  }

  /**
   * Affiche le joueur sur le canvas avec un emplacement aléatoire non bloquant.
   * @param {*} type
   * @return {Object}
   */
  setCanvas(type) {
    this.diffWidth = ($('#canvasMap').attr('width') - window.innerWidth) / 2;
    this.diffHeight = ($('#canvasMap').attr('height') - window.innerHeight) / 2;
    return $('<canvas></canvas>')
        .attr('id', this.player + 'Canvas')
        .attr('width', this.stage.width * 2)
        .attr('height', this.stage.height * 2)
        .css('position', 'relative')
        .ready(() => {
          if (type != undefined) {
            let x = 0;
            let y = 0;
            do {
              x = this.diffWidth + this.sizeMulti*2 + Math.ceil(
                  Math.random() * window.innerWidth -
              this.stage.width * this.sizeMulti * 3,
              );
              y = this.diffHeight + this.sizeMulti*2+ Math.ceil(
                  Math.random() * window.innerHeight -
              this.stage.height * this.sizeMulti / 2,
              );
            } while (checkSpawn(this.map, x, y, this.tileSize));

            this.vitesse = 10;
            this.positionX = x;
            this.positionY = y;
            $('#' + this.player + 'Canvas').css('position', 'absolute');
            $('#' + this.player + 'Canvas').css('top', '50%');
            $('#' + this.player + 'Canvas').css('left', '50%');
            $('#' + this.player + 'Canvas').css(
                'transform',
                'translate(-50%, -50%)',
            );
            $('#' + this.player + 'Canvas').attr(
                'width',
                $('#canvasMap').attr('width'),
            );
            $('#' + this.player + 'Canvas').attr(
                'height',
                $('#canvasMap').attr('height'),
            );
          }
          this.backPostX = 0;
          this.backPostY = 0;

          this.loop($('#' + this.player + 'Canvas').get(0).getContext('2d'));
        });
  }

  /**
   * Rend le joueur dynamique.
   * @param {*} ctx
   */
  loop(ctx) {
    if (this.animation) {
      ctx.clearRect(
          this.positionX,
          this.positionY,
          this.positionX + (this.stage.width * this.sizeMulti),
          this.positionY + (this.stage.height * this.sizeMulti),
      );
      this.move();
      this.render(ctx);


      setTimeout(() => {
        window.requestAnimationFrame(() => this.loop(ctx));
      }, 50);
    }
  }

  /**
   * Bloque le déplacement du joueur.
   */
  freez() {
    this.dontMove = true;
  }

  /**
   * Active les contacts avec l'autre joueur.
   */
  vulnerabilite() {
    this.vul = true;
  }

  /**
   * Débloque le déplacement du joueur.
   */
  unFreez() {
    this.dontMove = false;
  }

  /**
   * Désactive les contacts avec l'autre joueur.
   */
  invulnerabilite() {
    this.vul = false;
  }

  /**
   * Permet de faire bouger le joueur en fonction des touches du clavier.
   * La vitesse dépend des caractéristiques de la classe et
   * des obstacles sur la map.
   */
  move() {
    Object.keys(PLAYER[this.idPlayer].commands).forEach((command) => {
      if (this.keysDown[command] && !this.dontMove) {
        const dataMove = PLAYER[this.idPlayer].commands[command];
        this.sourceY = dataMove[0];
        this.sourceX = (this.sourceX + 1) % 3;
        if (this.map != undefined) {
          const valeur = classEffects(
              this.effectList,
              this.map,
              this.positionX + dataMove[1][0] * this.vitesse,
              this.positionY + dataMove[1][1] * this.vitesse,
              this.tileSize,
              this.reverseDictListTiles,
          );
          this.gestionVitesse(valeur, dataMove);
        }
        if (this.vul) {
          const x2 = this.player2.positionX +
                      (this.stage.width * this.sizeMulti)/ 2;
          const y2 = this.player2.positionY +
                      (this.stage.height * this.sizeMulti) / 2;
          if (
            x2 >= this.positionX &&
            x2 < this.positionX + this.stage.width * this.sizeMulti &&
            y2 >= this.positionY &&
            y2 < this.positionY + this.stage.height * this.sizeMulti
          ) {
            this.timer.changePlayer();
          }
        }
      }
    });
  }

  /**
   * Gère la vitesse de déplacement sur le canvas.
   * @param {*} valeur
   * @param {*} dataMove
   */
  gestionVitesse(valeur, dataMove) {
    if (valeur > 0) {
      this.vitesse = valeur;
      if (
        this.positionX + dataMove[1][0] * this.vitesse >=
              this.stage.height * this.sizeMulti &&
              this.positionX + dataMove[1][0] * this.vitesse <=
              window.innerWidth + this.diffWidth -
              this.stage.width * this.sizeMulti
      ) {
        this.positionX += dataMove[1][0] * this.vitesse;
      }

      if (
        this.positionY + dataMove[1][1] * this.vitesse >= 0 &&
              this.positionY + dataMove[1][1] * this.vitesse <=
              window.innerHeight + this.diffHeight -
              this.stage.height * this.sizeMulti
      ) {
        this.positionY += dataMove[1][1] * this.vitesse;
      }
    }
  }

  /**
   * Affiche l'image du joueur sur son canvas.
   * @param {*} ctx
   */
  render(ctx) {
    ctx.save();

    if (this.bomber) {
      this.setBomb();
    }

    ctx.drawImage(
        this.img,
        this.sourceX * PLAYER.width,
        this.sourceY * PLAYER.height,
        PLAYER.width,
        PLAYER.height,
        this.positionX,
        this.positionY,
        PLAYER.width * this.sizeMulti,
        PLAYER.height * this.sizeMulti,
    );

    ctx.restore();
  }
}
