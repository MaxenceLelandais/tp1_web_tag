import { MAP } from "../data/sprite.js";


export function createMap() {
    const mapping = [];
    const background = createBackground(MAP.startTile);
    mapping.push(background);
    /**
    Object.keys(MAP.layerList).forEach(layer => {
        mapping.push(createLayer(MAP.layerList[layer], background));
    })
    */
    return mapping;
}

function initializeLayer() {
    const layer = [];

    for (let y = 0; y < MAP.mapHeight; y++) {
        let row = [];
        for (let x = 0; x < MAP.mapWidth; x++) {
            
            row.push(MAP.compress(MAP.defaultBackground)+1);
        }
        layer[y] = row;
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

    return layer.conditions[position];
}

function recursifCreationBackground(background, x, y, initial, profondeur) {
    

    if (x >= 0 && x < MAP.mapWidth && y >= 0 && y < MAP.mapHeight && profondeur < 40) {
        
        background[y][x] = MAP.listTiles.base.couches[initial];
        const listCoords = [[1,x, y - 1],[3,x - 1, y], [4,x + 1, y],  [6,x, y + 1], [7,x +1, y+1], [5,x - 1, y + 1],[0,x - 1, y - 1], [2,x + 1, y - 1],];

        listCoords.forEach(coords => {
            if (coords[0] >= 0 && coords[1] < MAP.mapWidth && coords[2] >= 0 && coords[2] < MAP.mapHeight) {
                
                if (background[coords[2]][coords[1]] === MAP.compress(MAP.defaultBackground) + 1 && (Math.random() > MAP.randomPositionnement[coords[0]] || (x === MAP.mapWidth / 2 && y ===MAP.mapHeight / 2))) {
                    
                    const value = getNextValue(MAP.background, MAP.background[initial]);
                    recursifCreationBackground(background, coords[1], coords[2], value, profondeur++);
                }
            }
        })
    }
}

function filtrage(background) {
    
    for (let y = 0; y < MAP.mapHeight; y++) {
        
        for (let x = 0; x < MAP.mapWidth; x++) {
            for (let dy = -1; dy < 2; dy++) {
                for (let dx = -1; dx < 2; dx++) {

                    if (!(dx ===0 && dy === 0)){
                        if (x + dx >= 0 && x + dx < MAP.mapWidth && y + dy >= 0 && y + dy < MAP.mapHeight) {
                            let value = background[y + dy][x + dx];
                            let value2 = background[y][x];
                            
                            if (value - value2 > 0){                                
                                background[y + dy][x + dx] = value2 + 1;
                            } else if (value - value2 < 0){
                                background[y + dy][x + dx] = value2 - 1;
                            } else {
                                background[y + dy][x + dx] = value;
                            }
                        }
                    }
                }
            }
        }
    }
}

function convertToCoords(layer){
    const reverseCouches = MAP.reverseTiles(MAP.listTiles.base.couches);
    for (let y = 0; y < MAP.mapHeight; y++) {
        for (let x = 0; x < MAP.mapWidth; x++) {
            layer[y][x] = MAP.compress(MAP.listTiles.base[reverseCouches[layer[y][x]]]);
        }
    }
}

function createBackground(initial) {
    const background = initializeLayer();

    recursifCreationBackground(background, MAP.mapWidth / 2, MAP.mapHeight / 2, initial,0);
    filtrage(background);
    convertToCoords(background);
    
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
