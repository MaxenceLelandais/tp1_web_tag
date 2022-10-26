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
    effectList, map, x, y, sizeTiles, reverseDictListTiles,
) {
  const post = getCoordsInMap(x, y, sizeTiles);
  const tileName = reverseDictListTiles[map[0][post[1]][post[0]]-1];
  if (MAP.listTilesLayerObstacles[map[1][post[1]][post[0]]-1] != undefined) {
    return 0;
  };
  return effectList[tileName] != undefined ?
      PLAYER.initSpeed - effectList[tileName] : PLAYER.initSpeed;
}

/**
 * La fonction checkSpawn regarde si le spawn d'un joueur est obstrué.
 * @param {*} map
 * @param {*} x
 * @param {*} y
 * @param {*} sizeTiles
 * @return {Object}
 */
export function checkSpawn(map, x, y, sizeTiles) {
  const post = getCoordsInMap(x, y, sizeTiles);
  return MAP.listTilesLayerObstacles[map[1][post[1]][post[0]]] != undefined;
}

/**
 * Convertis les coordonnées du canvas en coordonnées matricielles.
 * @param {*} x
 * @param {*} y
 * @param {*} sizeTiles
 * @return {Object}
 */
function getCoordsInMap(x, y, sizeTiles) {
  return [Math.ceil((x / sizeTiles)), Math.ceil((y / sizeTiles))];
}
