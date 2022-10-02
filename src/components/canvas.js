import { MAP } from "../data/sprite.js";
import TileMap from "../model/tileMap.js";

const asset = {};
const scene = {};

export function canvas() {

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';

    loadImage('tileAtlas', MAP.src);

    scene.context = canvas.getContext('2d');

    return canvas;
}

export function refreshCanvas(tileSize, width, height, change) {

    const canvas = document.getElementById('canvas');

    

    canvas.height = height * tileSize;
    canvas.width = width * tileSize;

    if (change) {
        scene.tileMap = new TileMap(asset.tileAtlas, tileSize, width, height);
    } else{
        scene.tileMap.tileSize = tileSize;
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
    //scene.tileMap.render(scene.context, 1);
}

