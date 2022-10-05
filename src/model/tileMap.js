import { MAP } from "../data/sprite.js";
import Map from "./map.js";

export default class TileMap {

    constructor(tileAtlas, tileSize, width, height) {
        this.tileAtlas = tileAtlas;
        this.tileSize = tileSize;
        this.width = width;
        this.height = height;
        this.map = new Map(this.width, this.height);
    }

    render(ctx, layer) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let element = this.map[layer][y][x];
                ctx.drawImage(
                    this.tileAtlas,
                    MAP.tileSize * element,
                    MAP.tileSize * layer,
                    MAP.tileSize,
                    MAP.tileSize,
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                )
            }
        }
    }
}