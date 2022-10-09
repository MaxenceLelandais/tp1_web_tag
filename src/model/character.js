import { PLAYER } from "../data/sprite.js";

export default class Character {
    
    stage = {};
    keysDown = {};
    sourceX = 1;
    sourceY = 2;

    constructor(player){
        this.player = player;
        this.stage.width = PLAYER.width;
        this.stage.height = PLAYER.height;
        this.setPlayerClass('default');
        $('body').on('keydown', event => {
            this.keysDown[event.key] = true;
        });

        $('body').on('keyup', event => {
            delete this.keysDown[event.key];
        });
    }

    setPlayerClass(playerClass){
        this.playerClass = playerClass;
        this.img = new Image();
        this.img.src = PLAYER.listClass.src +this.playerClass+ PLAYER.listClass.type;
    }

    setCanvas(){
        return $('<canvas></canvas>')
        
                .attr('id', this.player + 'Canvas')
                .attr('width', this.stage.width*2)
                .attr('height', this.stage.height*2)
                .ready(() => {
                    this.loop($('#'+this.player + 'Canvas').get(0).getContext('2d'))
                })
    }

    loop(ctx) {
        ctx.clearRect(0, 0, this.stage.width*2, this.stage.height*2);
        this.move();
        this.render(ctx);

    
        setTimeout(() => {
            window.requestAnimationFrame(() => this.loop(ctx));
        }, 150);
    }

    move() {
        Object.keys(PLAYER[this.player].commands).forEach(command => {
            if (this.keysDown[command]) {
                this.sourceY = PLAYER[this.player].commands[command];
                this.sourceX = (this.sourceX+1)%3;
            }
        })
    }

    render(ctx){
        ctx.save();

        ctx.drawImage(
            this.img,
            this.sourceX * PLAYER.width,
            this.sourceY * PLAYER.height,
            PLAYER.width,
            PLAYER.height,
            0,
            0,
            PLAYER.width * 2,
            PLAYER.height * 2,
        );

        ctx.restore();
    }

    
}