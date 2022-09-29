import { MAP } from "../data/sprite.js";
import { createMap } from "./map.js";

export default class TileMap {

    constructor(tileAtlas, tileSize) {
        this.tileAtlas = tileAtlas;
        this.tileSize = tileSize;
        this.map = createMap()
    }

    render(ctx, layer) {
        for (let y = 0; y < MAP.mapHeight; y++) {
            for (let x = 0; x < MAP.mapWidth; x++) {
                let element = this.map[layer][y][x]--;
                ctx.drawImage(
                    this.tileAtlas,
                    this.tileSize * element,
                    0,
                    this.tileSize,
                    this.tileSize,
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                )
            }
        }

    }
}