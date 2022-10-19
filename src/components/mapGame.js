import $ from 'jquery';
import {MAP} from '../data/sprite.js';
import TileMap from '../model/tileMap.js';

const asset = {};
const scene = {};

/**
 *
 * @return {Object}
 */
export function canvas() {
  const canvas = $('<canvas id="canvasMap"></canvas>');
  loadImage('tileAtlas', MAP.src);
  scene.context = canvas.get(0).getContext('2d');

  return canvas;
}

/**
 *
 * @param {*} maxSize
 * @param {*} change
 */
export function refreshCanvas(maxSize, change) {
  const width = $('#sizeMap').val() * 2;
  const height = $('#sizeMap').val();

  const size = parseInt((
    maxSize === -1 ? window.innerHeight + parseInt(height) : maxSize) / height);
  $('#canvasMap').attr('height', height * size).attr('width', width * size);

  if (change) {
    scene.tileMap = new TileMap(asset.tileAtlas, size, width, height);
  } else {
    scene.tileMap.tileSize = size;
  }
  render();
}

/**
 *
 * @param {*} key
 * @param {*} src
 */
function loadImage(key, src) {
  asset[key] = new Image();
  asset[key].addEventListener('load', render);
  asset[key].src = src;
}

/**
 *
 */
function render() {
  if (scene.tileMap!=undefined) {
    scene.tileMap.render(scene.context, 0);
    scene.tileMap.render(scene.context, 1);
  }
}
