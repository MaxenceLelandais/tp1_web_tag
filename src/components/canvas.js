import { MAP } from "../data/sprite.js";
import TileMap from "../model/tileMap.js";

const asset = {};
const scene = {};

export function canvas() {

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';

    loadImage('tileAtlas', '../assets/tiles.png');

    scene.tileMap = new TileMap(asset.tileAtlas, MAP.tileSize);

    canvas.height = MAP.mapHeight * MAP.tileSize;
    canvas.width = MAP.mapWidth * MAP.tileSize;

    scene.context = canvas.getContext('2d');

    return canvas;
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