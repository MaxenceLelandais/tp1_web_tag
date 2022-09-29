export const MAP = {

    src: '../assets/tiles.png',
    tileSize: 64,

    mapWidth: 30,
    mapHeight: 30,

    randomPositionnement : [0.6,0.5,0.4,0.5],
    defaultBackground : 2,

    listTiles: {
        'grass': 1,
        'dirt': 2,
        'tree': 3,
        'treetop': 4,
        'bush': 5,
        'void': 6
    },

    listReverseTiles: {
        1: 'grass',
        2: 'dirt',
        3: 'tree',
        4: 'treetop',
        5: 'bush',
        6: 'void'
    },

    background: {
        conditions: ['grass', 'dirt', 'tree'],
        'grass': [0.8, 0, 0.2], // la somme en ligne doit faire 1
        'dirt': [0.05, 0.95, 0],
        'tree': [0, 0.7, 0.3]
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