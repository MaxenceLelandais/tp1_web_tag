import {MAP} from '../data/sprite.js';

/**
 * La classe Map permet de générer des matrices
 * contenant les numéros des tuiles.
 */
export default class Map {
  /**
   * Initialise la liste des layers et créer leur matrice.
   * @param {*} width
   * @param {*} height
   * @param {*} ctx
   * @param {*} tileAtlas
   * @param {*} tileSize
   * @param {*} animeGeneration
   * @return {Object}
   */
  constructor(width, height, ctx, tileAtlas, tileSize, animeGeneration) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.tileAtlas = tileAtlas;
    this.tileSize = tileSize;
    this.animeGeneration = animeGeneration;
    const mapping = [];
    const background = this.createBackground(MAP.startTile);
    mapping.push(background);

    Object.keys(MAP.layerList).forEach((layer) => {
      mapping.push(this.createLayer(MAP.layerList[layer], background));
    });

    return mapping;
  }

  /**
   * Initialise les matrices par la valeur par défaut.
   * @return {Object}
   */
  initializeLayer() {
    const layer = [];
    for (let y = 0; y < this.height; y++) {
      layer.push(Array(this.width).fill(MAP.defaultBackground));
    }
    return layer;
  }

  /**
   * Retourne le numéro de la prochaine tuile
   * en fonction de la matrice des probabilités de la tuile initiale.
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
   * @param {*} x
   * @param {*} y
   * @param {*} initial
   */
  animeMap(x, y, initial) {
    if (this.animeGeneration) {
      setTimeout(() => {
        // window.requestAnimationFrame(() =>
        this.ctx.drawImage(
            this.tileAtlas,
            MAP.tileSize * initial,
            0,
            MAP.tileSize,
            MAP.tileSize,
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize,
        // ),
        );
      }, 0);
    }
  }

  /**
   * Génère récursivement les numéros correspondant aux tuiles dans la matrice.
   * La pile ne peut dépasser 2000 de profondeur.
   * Pour chaque position, il génère les nombres des cases aux alentours.
   * Pour chaque case, il check si elle est vide,
   * si sa position est correcte et à une chance de ne pas générer de nombre.
   * @param {*} background
   * @param {*} x
   * @param {*} y
   * @param {*} initial
   * @param {*} listReverseTiles
   * @param {*} profondeur
   */
  recursifCreationBackground(
      background,
      x,
      y,
      initial,
      listReverseTiles,
      profondeur,
  ) {
    if (background[y][x] === MAP.defaultBackground) {
      if (
        x >= 0 &&
      x < this.width &&
      y >= 0 &&
      y < this.height &&
      profondeur < 2000
      ) {
        background[y][x] = initial;
        this.animeMap(x, y, initial);
        initial = listReverseTiles[initial];

        const listCoords = [
          [1, x, y - 1],
          [3, x - 1, y],
          [4, x + 1, y],
          [6, x, y + 1],
          [7, x + 1, y + 1],
          [5, x - 1, y + 1],
          [0, x - 1, y - 1],
          [2, x + 1, y - 1],
        ];

        listCoords.forEach((coords) => {
          if (
            coords[1] >= 0 &&
          coords[1] < this.width &&
          coords[2] >= 0 &&
          coords[2] < this.height
          ) {
            if (
              background[coords[2]][coords[1]] === MAP.defaultBackground &&
              Math.random() > MAP.randomPositionnement[coords[0]]
            ) {
              this.recursifCreationBackground(
                  background,
                  coords[1],
                  coords[2],
                  this.getNextValue(MAP.background, MAP.background[initial]),
                  listReverseTiles,
                  ++profondeur,
              );
            }
          }
        });
      }
    }
  }

  /**
   * Cette fonction joue le rôle de filtre de brouillage et de lissage.
   * Le brouillage permet de modifier de façon aléatoire une tuile qui
   * a pour tuiles voisines une valeur bien plus grande.
   * Cela permet de minimiser la linéarité du lissage.
   * Le lissage permet d'optenir une suite de tuiles qui se suivent.
   * @param {*} background
   */
  filtrage(background) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const liste = [
          [-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1],
        ];
        liste.forEach((coords) => {
          const dx = coords[0];
          const dy =coords[1];

          if (
            x + dx >= 0 &&
              x + dx < this.width &&
              y + dy >= 0 &&
              y + dy < this.height
          ) {
            if (
              !(
                background[y][x] === MAP.defaultBackground &&
                background[y + dy][x + dx] === MAP.defaultBackground
              )
            ) {
              this.typeFiltre(x, y, dx, dy, background);
            }
          }
        });
      }
    }
  }

  /**
   * Factorisation de la fonction de filtrage.
   * @param {*} x
   * @param {*} y
   * @param {*} dx
   * @param {*} dy
   * @param {*} background
   */
  typeFiltre(x, y, dx, dy, background) {
    const value = Math.abs(background[y + dy][x + dx]);
    const value2 = Math.abs(background[y][x]);
    let ajout = 1;
    if (
      Math.abs(value - value2) > 1 &&
            Math.random() > MAP.randomFiltreLissage &&
            value2 + 2 < 13 &&
            value2 - 2 >= 0
    ) {
      ajout = 2;
    }


    if (value - value2 > 0) {
      background[y + dy][x + dx] = value2 + ajout;
      this.animeMap(x + dx, y + dy, value2 + ajout);
    } else if (value - value2 < 0) {
      background[y + dy][x + dx] = value2 - ajout;
      this.animeMap(x + dx, y + dy, value2 - ajout);
    }
  }

  /**
   * Ici on lance les générations récussives de tuiles.
   * On part d'une graine contenant la position du point de génération
   * et la tuile initiale.
   * On refait d'autres générations en fonction de la taille de la map.
   * La matrice finale est brouillée puis lissée.
   * @param {*} initial
   * @return {Object}
   */
  createBackground(initial) {
    const background = this.initializeLayer();
    const listReverseTiles = MAP.reverseTiles(MAP.listTiles);

    this.recursifCreationBackground(
        background,
        this.width / 2,
        this.height / 2,
        MAP.listTiles[initial],
        listReverseTiles,
        0,
    );

    for (let i = 0; i < Math.ceil((this.width * this.height) / 100000); i++) {
      this.recursifCreationBackground(
          background,
          Math.ceil(Math.random() * (this.width - 5)),
          Math.ceil(Math.random() * (this.height - 5)),
          MAP.listTiles[initial],
          listReverseTiles,
          0,
      );
    }
    this.filtrage(background);
    return background;
  }

  /**
   * On retrouve le même fonctionnement que pour la génération du background.
   * Cette génération dépend du contenu du background.
   * Pour toutes les tuiles qui peuvent contenir un "objet",
   * la fonction a une chance de lui attribuer un de ces "objets"
   * en fonction de la matrice de probabilité d'apparition.
   * La génération est à balayage horizontal.
   * Il y a plus de chance que plusieurs "objets"
   * se suivent horizontalement que verticalement.
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
