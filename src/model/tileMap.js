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
                const element = MAP.decompress(this.map[layer][y][x]--);
                ctx.drawImage(
                    this.tileAtlas,
                    MAP.tileSize * element[0],
                    MAP.tileSize * element[1],
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