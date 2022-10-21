import {MAP} from '../data/sprite.js';
import Map from './map.js';

/**
 * Cette classe à pour but de créer une map et de l'afficher sur le canvas.
 */
export default class TileMap {
  /**
     * Le constructeur garde en mémoire les données de base
     * pour le canvas et la map.
     * Puis, il créer une map.
     * @param {*} tileAtlas
     * @param {*} tileSize
     * @param {*} width
     * @param {*} height
     */
  constructor(tileAtlas, tileSize, width, height) {
    this.tileAtlas = tileAtlas;
    this.tileSize = tileSize;
    this.width = width;
    this.height = height;
    this.map = new Map(this.width, this.height);
  }

  /**
   * La fonction render cherche les données de la map
   * en fonction du layer demandé.
   * Il dessine ensuite les tuiles correspondantes.
   * @param {*} ctx
   * @param {*} layer
   */
  render(ctx, layer) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const a = this.map[layer][y][x];
        if (a != -1 && a != 0) {
          ctx.drawImage(
              this.tileAtlas,
              MAP.tileSize * a,
              MAP.tileSize * layer,
              MAP.tileSize,
              MAP.tileSize,
              x * this.tileSize,
              y * this.tileSize,
              this.tileSize,
              this.tileSize,
          );
        }
      }
    }
  }
}
