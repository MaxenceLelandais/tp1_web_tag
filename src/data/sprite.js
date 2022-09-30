export const MAP = {

    src1: '../assets/tiles.png',
    src: '../assets/tiles2.png',
    tileSize: 64,

    mapWidth: 100,
    mapHeight: 100,

    randomPositionnement : [0.3,0.3,0.3,0.3],
    defaultBackground : 0,
    startTile : 'deepwater',

    listTiles1: {
        'grass': 1,
        'dirt': 2,
        'tree': 3,
        'treetop': 4,
        'bush': 5,
        'void': 6
    },

    listTiles: {
        'deepwater': 1,
        'water': 2,
        'sand': 3,
        'dirt': 4,
        'grass': 5,
        'tree': 6,
        'stone': 7,
        'snow': 8
    },


    listReverseTiles1: {
        1: 'grass',
        2: 'dirt',
        3: 'tree',
        4: 'treetop',
        5: 'bush',
        6: 'void'
    },

    listReverseTiles: {
        1: 'deepwater',
        2: 'water',
        3: 'sand',
        4: 'dirt',
        5: 'grass',
        6: 'tree',
        7: 'stone',
        8: 'snow'
    },

    background1: {
        conditions: ['grass', 'dirt', 'tree'],
        'grass': [0.8, 0, 0.2], // la somme en ligne doit faire 1
        'dirt': [0.05, 0.95, 0],
        'tree': [0, 0.7, 0.3]
    },

    background: {
        conditions: ['deepwater', 'water', 'sand', 'dirt', 'grass', 'tree', 'stone', 'snow'],
        'deepwater': [0.9,0.1,0,0,0,0,0,0], 
        'water': [0.3,0.5,0.2,0,0,0,0,0], 
        'sand': [0,0.1,0.6,0,0.3,0,0,0], 
        'dirt': [0,0,0.2,0.7,0.1,0,0,0], 
        'grass': [0,0,0.2,0,0.4,0.4,0,0], 
        'tree': [0,0,0,0,0.3,0.5,0.2,0], 
        'stone': [0,0,0,0,0,0.2,0.6,0.2], 
        'snow': [0,0,0,0,0,0.2,0.6,0.2], 
    },

    layerList: {
        layer1: {
            conditions: ['treetop', 'bush', 'void'],

            'grass': [0, 0, 1], // la somme en ligne doit faire 1
            'dirt': [0, 0.1, 0.9],
            'tree': [1, 0, 0]
        }
    }
}