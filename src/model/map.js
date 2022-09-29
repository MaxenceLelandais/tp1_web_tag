import { MAP } from "../data/sprite.js";


export function createMap() {
    const mapping = [];
    const background = createBackground('grass');
    mapping.push(background);


    Object.keys(MAP.layerList).forEach(layer => {
        mapping.push(createLayer(MAP.layerList[layer], background));
    })



    return mapping;
}

function createBackground(initial) {

    const background = [];

    for (let y = 0; y < MAP.mapHeight; y++) {
        const row = [];
        for (let x = 0; x < MAP.mapWidth; x++) {

            let proba = Math.random();
            let position = 0;
            MAP.background[initial].forEach(element => {
                proba -= element;
                if (proba < 0) {
                    return true;
                }
                position++;
            });

            initial = MAP.background.conditions[position];

            row.push(MAP.listTiles[initial] - 1);
        }
        background.push(row);
    }

    return background;
}


function createLayer(layer, background) {

    const layerMap = [];

    for (let y = 0; y < MAP.mapHeight; y++) {
        const row = [];
        for (let x = 0; x < MAP.mapWidth; x++) {

            let proba = Math.random();
            let position = 0;

            layer[MAP.listReverseTiles[background[y][x] + 1]].forEach(element => {
                proba -= element;
                if (proba < 0) {
                    return true;
                }
                position++;
            });

            const key = layer.conditions[position];


            if (key === 'treetop') {
                if (y - 1 >= 0) {
                    layerMap[y - 1][x] = MAP.listTiles[key] - 1;
                }
                row.push(5);
            } else {
                row.push(MAP.listTiles[key] - 1);
            }

        }

        layerMap.push(row);
    }

    return layerMap;
}
