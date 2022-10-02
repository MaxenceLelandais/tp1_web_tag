export const MAP = {
    src: '../assets/tiles2.png',
    tileSize: 64,
    drawSize : 64,

    mapWidth: 10,
    mapHeight: 10,

    randomPositionnement : [0.6, 0.6, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
    defaultBackground : 0,
    startTile : 'deepwater',

    listTiles: {
        'deepwater': 1,
        'midlewater' : 2,
        'water': 3,
        'watersand' : 4,
        'sand': 5,
        'grasssand' : 6,
        'grass': 7,
        'tree': 8,
        'dirt': 9,
        'blackdirt': 10,
        'stone': 11,
        'stonesnow': 12,
        'snow': 13
    },


    listReverseTiles: {
        1: 'deepwater',
        2: 'midlewater',
        3: 'water',
        4: 'watersand',
        5: 'sand',
        6: 'grasssand',
        7: 'grass',
        8: 'tree',
        9: 'dirt',
        10: 'blackdirt',
        11: 'stone',
        12: 'stonesnow',
        13: 'snow'
    },

    background: {
        conditions: ['deepwater', 'midlewater','water','watersand','sand','grasssand','grass','tree','dirt','blackdirt','stone','stonesnow','snow'],
        'deepwater': [0.8,0.2,0,0,0,0,0,0,0,0,0,0,0], 
        'midlewater': [0.025,0.95,0.025,0,0,0,0,0,0,0,0,0,0],
        'water': [0,0.025,0.95,0.025,0,0,0,0,0,0,0,0,0],
        'watersand': [0,0,0.025,0.95,0.025,0,0,0,0,0,0,0,0],
        'sand': [0,0,0,0.025,0.95,0.025,0,0,0,0,0,0,0],
        'grasssand': [0,0,0,0,0.025,0.95,0.025,0,0,0,0,0,0],
        'grass': [0,0,0,0,0,0.025,0.95,0.025,0,0,0,0,0],
        'tree': [0,0,0,0,0,0,0.025,0.95,0.025,0,0,0,0],
        'dirt': [0,0,0,0,0,0,0,0.025,0.95,0.025,0,0,0],
        'blackdirt': [0,0,0,0,0,0,0,0,0.025,0.95,0.025,0,0],
        'stone': [0,0,0,0,0,0,0,0,0,0.025,0.95,0.025,0],
        'stonesnow': [0,0,0,0,0,0,0,0,0,0,0.025,0.95,0.025],
        'snow': [0,0,0,0,0,0,0,0,0,0,0.2,0.7,0.1],
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