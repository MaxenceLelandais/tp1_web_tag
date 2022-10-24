import $ from 'jquery';
import {MAP} from '../data/sprite.js';
import TileMap from '../model/tileMap.js';

const asset = {};
const scene = {};

/**
 * Affiche la map vide.
 * @return {Object}
 */
export function canvas() {
  const canvas = $('<canvas></canvas>').attr('id', 'canvasMap');

  loadImage('tileAtlas', MAP.src);
  scene.context = canvas.get(0).getContext('2d');

  return $('<div></div>').attr('id', 'map').append(canvas);
}

/**
 * Actualise le canvas en changeant sa taille et en affichant les tuiles dessus.
 * @param {*} maxSize
 * @param {*} change
 * @param {*} mode
 * @return {Object}
 */
export function refreshCanvas(maxSize, change, mode) {
  const width = $('#sizeMap').val() * 2;
  const height = $('#sizeMap').val();
  const animeGeneration = $('#animeGeneration').is(':checked');
  let size = parseInt((
    maxSize === -1 ? window.innerHeight + parseInt(height) : maxSize) / height);

  if (size < 1) {
    size = 1;
  }
  $('#canvasMap').attr('height', height * size).attr('width', width * size);
  if (change) {
    scene.tileMap = new TileMap(
        scene.context,
        asset.tileAtlas,
        size,
        width,
        height,
        animeGeneration,
    );
  } else {
    scene.tileMap.tileSize = size;
  }
  if (!animeGeneration || mode) {
    render();
  }

  return scene.tileMap;
}

/**
 * Charge l'image qui contient toutes les tuiles.
 * @param {*} key
 * @param {*} src
 */
function loadImage(key, src) {
  asset[key] = new Image();
  asset[key].addEventListener('load', render);
  asset[key].src = src;
}

/**
 * Affiche les tuiles sur le canvas.
 */
function render() {
  if (scene.tileMap != undefined) {
    scene.tileMap.render(scene.context, 0);
    scene.tileMap.render(scene.context, 1);
  }
}
