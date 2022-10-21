import {MAP, PLAYER} from '../data/sprite';
/**
 * La fonction classEffects permet de changer la vitesse du joueur
 * en fonction de sa classe et de la case où il se situe.
 * @param {*} effectList
 * @param {*} map
 * @param {*} x
 * @param {*} y
 * @param {*} sizeTiles
 * @param {*} reverseDictListTiles
 * @return {Object}
 */
export function classEffects(
    effectList, map, x, y, sizeTiles, reverseDictListTiles) {
  const postX = Math.ceil((x / sizeTiles));
  const postY = Math.ceil((y / sizeTiles));
  const tileName = reverseDictListTiles[map[0][postY][postX]];
  if (MAP.listTilesLayerObstacles[map[1][postY][postX]] != undefined) {
    return 0;
  };
  return effectList[tileName] != undefined ?
    PLAYER.initSpeed - effectList[tileName] : PLAYER.initSpeed;
}

/**
 * La fonction checkSpawn regarde si le spawn d'un joueur est obstruée.
 * @param {*} map
 * @param {*} x
 * @param {*} y
 * @param {*} sizeTiles
 * @return {Object}
 */
export function checkSpawn(map, x, y, sizeTiles) {
  const postX = Math.ceil((x / sizeTiles));
  const postY = Math.ceil((y / sizeTiles));
  return MAP.listTilesLayerObstacles[map[1][postY][postX]] != undefined;
}
