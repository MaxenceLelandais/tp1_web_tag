import $, {get} from 'jquery';
import {MAP, PLAYER} from '../data/sprite.js';
import {checkSpawn, classEffects} from '../model/classEffects.js';

/**
 *
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


  /**
   *
   * @param {*} player
   */
  constructor(player) {
    this.player = player;
    this.stage.width = PLAYER.width;
    this.stage.height = PLAYER.height;
    this.setPlayerClass('default');
    this.dontMove = false;
    $('body').on('keydown', (event) => {
      this.keysDown[event.key] = true;
    });

    $('body').on('keyup', (event) => {
      delete this.keysDown[event.key];
    });
  }

  /**
   *
   * @param {*} map
   * @param {*} tileSize
   */
  setData(map, tileSize) {
    this.map = map;
    this.tileSize = tileSize;
    this.effectList = PLAYER.listClass[this.playerClass].effectsList;
    this.reverseDictListTiles = MAP.reverseTiles(MAP.listTiles);
  }

  setTracker(timer, player2) {
    this.timer = timer;
    this.player2 = player2;
  }

  /**
   *
   * @param {*} playerClass
   */
  setPlayerClass(playerClass) {
    this.playerClass = playerClass;
    this.img = new Image();
    this.img.src = PLAYER.listClass.src +this.playerClass+
                   PLAYER.listClass.type;
  }

  setBomb() {
    const c = $('#'+this.player + 'Canvas').get(0);
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.positionX+this.stage.width/2, this.positionY+this.stage.height/2, this.stage.height/2, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
  }

  /**
   * Semble instable jquery ne peut pas lire une propriété
   * @param {*} type
   * @return {Object}
   */
  setCanvas(type) {
    this.diffWidth = ($('#canvasMap').attr('width') - window.innerWidth)/2;
    this.diffHeight = ($('#canvasMap').attr('height') - window.innerHeight)/2;
    return $('<canvas></canvas>')

        .attr('id', this.player + 'Canvas')
        .attr('width', this.stage.width*2)
        .attr('height', this.stage.height*2)
        .css('position', 'relative')
        .ready(() => {
          if (type != undefined) {
            let x = 0;
            let y = 0;
            do {
              x = Math.ceil( this.diffWidth + Math.random()* window.innerWidth - this.stage.width*this.sizeMulti);
              y = Math.ceil(this.diffHeight + Math.random() * window.innerHeight - this.stage.height*this.sizeMulti*2);
            } while (checkSpawn(this.map, x, y, this.tileSize));

            this.vitesse = 10;
            this.positionX = x;
            this.positionY = y;
            $('#'+this.player + 'Canvas').css('position', 'absolute');
            $('#'+this.player + 'Canvas').css('top', '50%');
            $('#'+this.player + 'Canvas').css('left', '50%');
            $('#'+this.player + 'Canvas').css('transform', 'translate(-50%, -50%)');
            $('#'+this.player + 'Canvas').attr('width', $('#canvasMap').attr('width'));
            $('#'+this.player + 'Canvas').attr('height', $('#canvasMap').attr('height'));
          }
          this.backPostX = 0;
          this.backPostY = 0;

          this.loop($('#'+this.player + 'Canvas').get(0).getContext('2d'));
        });
  }

  /**
   *
   * @param {*} ctx
   */
  loop(ctx) {
    ctx.clearRect(this.positionX -this.stage.width*this.sizeMulti, this.positionY-this.stage.height*this.sizeMulti, this.positionX + this.stage.width*this.sizeMulti, this.positionY + this.stage.height*this.sizeMulti);
    this.move();
    this.render(ctx);


    setTimeout(() => {
      window.requestAnimationFrame(() => this.loop(ctx));
    }, 100);
  }

  freez() {
    this.dontMove = true;
  }

  vulnerabilite() {
    this.vul = true;
  }

  unFreez() {
    this.dontMove = false;
  }

  invulnerabilite() {
    this.vul = false;
  }
  /**
   * crash dans move
   */
  move() {
    Object.keys(PLAYER[this.player].commands).forEach((command) => {
      if (this.keysDown[command] && !this.dontMove) {
        const dataMove = PLAYER[this.player].commands[command];
        this.sourceY = dataMove[0];
        this.sourceX = (this.sourceX+1)%3;
        if (this.map != undefined) {
          const valeur = classEffects(this.effectList, this.map, this.positionX+ dataMove[1][0] * this.vitesse, this.positionY+ dataMove[1][1] * this.vitesse, this.tileSize, this.reverseDictListTiles);

          if (valeur>0) {
            this.vitesse = valeur;

            if ( this.positionX + dataMove[1][0] * this.vitesse >=this.stage.height*this.sizeMulti && this.positionX + dataMove[1][0] * this.vitesse<=window.innerWidth + this.diffWidth - this.stage.width*this.sizeMulti) {
              this.positionX += dataMove[1][0] * this.vitesse;
            }

            if ( this.positionY + dataMove[1][1] * this.vitesse>=0 && this.positionY + dataMove[1][1] * this.vitesse<=window.innerHeight + this.diffHeight - this.stage.height*this.sizeMulti) {
              this.positionY += dataMove[1][1] * this.vitesse;
            }
          }
        }

        if (this.vul) {
          const x2 = this.player2.positionX;
          const y2 = this.player2.positionY;

          if (x2>=this.positionX && x2<this.positionX+this.stage.width*this.sizeMulti && y2>=this.positionY && y2<this.positionY+this.stage.height*this.sizeMulti) {
            this.timer.changePlayer();
          }
        }
      }
    });
  }

  /**
   *
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
