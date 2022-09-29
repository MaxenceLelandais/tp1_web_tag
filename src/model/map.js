import { MAP } from "../data/sprite.js";


export function createMap() {
    const mapping = [];
    const background = createBackground2('grass');
    mapping.push(background);

    Object.keys(MAP.layerList).forEach(layer => {
        mapping.push(createLayer(MAP.layerList[layer], background));
    })
    return mapping;
}

function initializeLayer() {
    const layer = [];

    for (let y = 0; y < MAP.mapHeight; y++) {
        const row = [];
        for (let x = 0; x < MAP.mapWidth; x++) {
            row.push(MAP.defaultBackground);
        }
        layer.push(row);
    }
    return layer;
}

function getNextValue(layer, list) {
    let proba = Math.random();
    let position = 0;

    list.forEach(element => {
        proba -= element;
        if (proba < 0) {
            return true;
        }
        position++;
    });

    return MAP.listTiles[layer.conditions[position]];
}

function recursifCreationBackground(background, x, y, initial) {

    if (x >= 0 && x < MAP.mapWidth && y >= 0 && y < MAP.mapHeight) {
        background[y][x] = initial - 1;

        initial = MAP.listReverseTiles[initial];

        if (y + 1 < MAP.mapHeight) {
            if (background[y + 1][x] === MAP.defaultBackground && Math.random() > MAP.randomPositionnement[0]) {
                let initial2 = getNextValue(MAP.background, MAP.background[initial]);
                recursifCreationBackground(background, x, y + 1, initial2);
            }
        }

        if (x + 1 < MAP.mapWidth) {
            if (background[y][x + 1] === MAP.defaultBackground && Math.random() > MAP.randomPositionnement[1]) {
                let initial2 = getNextValue(MAP.background, MAP.background[initial]);
                recursifCreationBackground(background, x + 1, y, initial2);
            }
        }

        if (y - 1 >= 0) {
            if (background[y - 1][x] === MAP.defaultBackground && Math.random() > MAP.randomPositionnement[2]) {
                let initial2 = getNextValue(MAP.background, MAP.background[initial]);
                recursifCreationBackground(background, x, y - 1, initial2);
            }
        }

        if (x - 1 >= 0) {
            if (background[y][x - 1] === MAP.defaultBackground && Math.random() > MAP.randomPositionnement[3]) {
                let initial2 = getNextValue(MAP.background, MAP.background[initial]);
                recursifCreationBackground(background, x - 1, y, initial2);
            }
        }
    }
}

function createBackground2(initial) {
    const background = initializeLayer();
    recursifCreationBackground(background, MAP.mapWidth / 2, MAP.mapHeight / 2, MAP.listTiles[initial]);
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
