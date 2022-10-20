import {MAP, PLAYER} from '../data/sprite';
import $ from 'jquery';
/**
 *
 * @param {*} effectList
 * @param {*} map
 * @param {*} x
 * @param {*} y
 * @param {*} sizeTiles
 * @param {*} reverseDictListTiles
 * @return {Object}
 */
export function classEffects(effectList, map, x, y, sizeTiles, reverseDictListTiles) {
  const postX = Math.ceil((x / sizeTiles));
  const postY = Math.ceil((y / sizeTiles));
  const tileName = reverseDictListTiles[map[0][postY][postX]];
  //   const c = $('#canvasMap').get(0);
  //   const ctx = c.getContext('2d');
  //   ctx.beginPath();
  //   const xx = postX * sizeTiles;
  //   const yy = postY * sizeTiles;
  //   const r = 6;
  //   ctx.fillRect(xx, yy, sizeTiles, sizeTiles);
  //   ctx.stroke();
  if (MAP.listTilesLayerObstacles[map[1][postY][postX]] != undefined) {
    return 0;
  };
  return effectList[tileName] != undefined ? PLAYER.initSpeed - effectList[tileName] : PLAYER.initSpeed;
}

/**
 *
 * @param {*} map
 * @param {*} x
 * @param {*} y
 * @param {*} sizeTiles
 * @return {Object}
 */
export function checkSpawn(map, x, y, sizeTiles) {
  const postX = Math.ceil((x / sizeTiles));
  const postY = Math.ceil((y / sizeTiles));
  // console.log([postY], [postX], MAP.listTilesLayerObstacles[map[1][postY][postX]], MAP.listTilesLayerObstacles[map[1][postY][postX]] != undefined);
  return MAP.listTilesLayerObstacles[map[1][postY][postX]] != undefined;
}
