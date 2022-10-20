import {MAP} from '../data/sprite.js';

/**
 *
 */
export default class Map {
  /**
     *
     * @param {*} width
     * @param {*} height
     * @return {Object}
     */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    const mapping = [];
    const background = this.createBackground(MAP.startTile);
    mapping.push(background);

    Object.keys(MAP.layerList).forEach((layer) => {
      mapping.push(this.createLayer(MAP.layerList[layer], background));
    });

    return mapping;
  }

  /**
   *
   * @return {Object}
   */
  initializeLayer() {
    const layer = [];

    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(MAP.defaultBackground);
      }
      layer.push(row);
    }
    return layer;
  }

  /**
   *
   * @param {*} layer
   * @param {*} list
   * @return {Object}
   */
  getNextValue(layer, list) {
    let proba = Math.random();
    let position = 0;

    list.forEach((element) => {
      proba -= element;
      if (proba < 0) {
        return true;
      }
      position++;
    });

    return MAP.listTiles[layer.conditions[position]];
  }

  /**
   *
   * @param {*} background
   * @param {*} x
   * @param {*} y
   * @param {*} initial
   * @param {*} listReverseTiles
   * @param {*} profondeur
   */
  recursifCreationBackground(background, x, y, initial, listReverseTiles, profondeur) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height && profondeur < 2000) {
      background[y][x] = initial;
      initial = listReverseTiles[initial];
      const listCoords = [[1, x, y - 1], [3, x - 1, y], [4, x + 1, y], [6, x, y + 1], [7, x + 1, y + 1], [5, x - 1, y + 1], [0, x - 1, y - 1], [2, x + 1, y - 1]];

      listCoords.forEach((coords) => {
        if (coords[0] >= 0 && coords[1] < this.width && coords[2] >= 0 && coords[2] < this.height) {
          if (background[coords[2]][coords[1]] === MAP.defaultBackground && (Math.random() > MAP.randomPositionnement[coords[0]] || (x === MAP.mapWidth / 2 && y === MAP.mapHeight / 2))) {
            this.recursifCreationBackground(background, coords[1], coords[2], this.getNextValue(MAP.background, MAP.background[initial]), listReverseTiles, ++profondeur);
          }
        }
      });
    }
  }

  /**
   *
   * @param {*} background
   * @param {*} modeRandom
   */
  filtrage(background, modeRandom) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        for (let dy = -1; dy < 2; dy++) {
          for (let dx = -1; dx < 2; dx++) {
            if (!(dx === 0 && dy === 0)) {
              if (x + dx >= 0 && x + dx < this.width && y + dy >= 0 && y + dy < this.height) {
                const value = Math.abs(background[y + dy][x + dx]);
                const value2 = Math.abs(background[y][x]);
                let ajout = 1;
                if (modeRandom) {
                  if (Math.abs(value - value2) > 1 && Math.random()>MAP.randomFiltreLissage && value2 + 2<13 && value2 - 2>=0) {
                    ajout = 2;
                  }
                }
                if (value - value2 > 0) {
                  background[y + dy][x + dx] = value2 + ajout;
                } else if (value - value2 < 0) {
                  background[y + dy][x + dx] = value2 - ajout;
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   *
   * @param {*} initial
   * @return {Object}
   */
  createBackground(initial) {
    const background = this.initializeLayer();
    const listReverseTiles = MAP.reverseTiles(MAP.listTiles);

    this.recursifCreationBackground(background, this.width / 2, this.height / 2, MAP.listTiles[initial], listReverseTiles, 0);
    this.filtrage(background, true);
    this.filtrage(background, false);
    return background;
  }

  /**
   *
   * @param {*} layer
   * @param {*} background
   * @return {Object}
   */
  createLayer(layer, background) {
    const listReverseTiles = MAP.reverseTiles(MAP.listTiles);
    const layerMap = [];
    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        let proba = Math.random();
        let position = 0;

        layer[listReverseTiles[background[y][x] + 1]].forEach((element) => {
          proba -= element;
          if (proba < 0) {
            return true;
          }
          position++;
        });

        row.push(MAP.listTilesLayer[layer.conditions[position]]);
      }
      layerMap.push(row);
    }
    return layerMap;
  }
}
