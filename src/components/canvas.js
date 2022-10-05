import { MAP } from "../data/sprite.js";
import TileMap from "../model/tileMap.js";

const asset = {};
const scene = {};

export function canvas() {

    const canvas = $('<canvas id="canvas"></canvas>');
    loadImage('tileAtlas', MAP.src);
    scene.context = canvas.get(0).getContext('2d');

    return canvas;
}

export function refreshCanvas(maxSize, change) {

    const width = $('#sizeMap').val() * 2;
    const height = $('#sizeMap').val();

    const size = parseInt((maxSize === -1 ? window.innerHeight + parseInt(height) : maxSize) / height);
    $('canvas').attr('height', height * size).attr('width', width * size);

    if (change) {
        scene.tileMap = new TileMap(asset.tileAtlas, size, width, height);
    } else {
        scene.tileMap.tileSize = size;
    }
    render();
}

function loadImage(key, src) {
    asset[key] = new Image();
    asset[key].addEventListener('load', render);
    asset[key].src = src;
}

function render() {
    scene.tileMap.render(scene.context, 0);
    scene.tileMap.render(scene.context, 1);
}

