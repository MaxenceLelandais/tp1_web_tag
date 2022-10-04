export const MAP = {
    src: '../assets/tiles2.png',
    tileSize: 64,
    drawSize: 64,

    mapWidth: 10,
    mapHeight: 10,

    randomPositionnement: [0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
    randomFiltreLissage : 0.5,
    defaultBackground: 0,
    startTile: 'deepwater',

    listTiles: {
        'deepwater': 1,
        'midlewater': 2,
        'water': 3,
        'watersand': 4,
        'sand': 5,
        'grasssand': 6,
        'grass': 7,
        'tree': 8,
        'dirt': 9,
        'blackdirt': 10,
        'stone': 11,
        'stonesnow': 12,
        'snow': 13,
        'gate': 14
    },

    listTilesLayer: {
        'poppy': 0,
        'yellowflower1': 1,
        'yellowflower2': 2,
        'treestump': 3,
        'rock1': 4,
        'rock2': 5,
        'rock3': 6,
        'rock4': 7,
        'cactus1': 8,
        'cactus2': 9,
        'cactus3': 10,
        'void': 11
    },


    reverseTiles(listTiles) {
        const newDict = {};
        Object.keys(listTiles).forEach(layer => {
            newDict[listTiles[layer]] = layer;
        })
        return newDict;
    },

    background: {
        conditions: ['deepwater', 'midlewater', 'water', 'watersand', 'sand', 'grasssand', 'grass', 'tree', 'dirt', 'blackdirt', 'stone', 'stonesnow', 'snow'],
        'deepwater': [0.8, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'midlewater': [0.025, 0.95, 0.025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'water': [0, 0.025, 0.95, 0.025, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'watersand': [0, 0, 0.025, 0.95, 0.025, 0, 0, 0, 0, 0, 0, 0, 0],
        'sand': [0, 0, 0, 0.025, 0.95, 0.025, 0, 0, 0, 0, 0, 0, 0],
        'grasssand': [0, 0, 0, 0, 0.025, 0.95, 0.025, 0, 0, 0, 0, 0, 0],
        'grass': [0, 0, 0, 0, 0, 0.025, 0.95, 0.025, 0, 0, 0, 0, 0],
        'tree': [0, 0, 0, 0, 0, 0, 0.025, 0.95, 0.025, 0, 0, 0, 0],
        'dirt': [0, 0, 0, 0, 0, 0, 0, 0.025, 0.95, 0.025, 0, 0, 0],
        'blackdirt': [0, 0, 0, 0, 0, 0, 0, 0, 0.025, 0.95, 0.025, 0, 0],
        'stone': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.025, 0.95, 0.025, 0],
        'stonesnow': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.025, 0.95, 0.025],
        'snow': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.7, 0.1],
    },

    layerList: {
        layer1: {
            conditions: ['poppy', 'yellowflower1', 'yellowflower2', 'treestump', 'rock1', 'rock2', 'rock3', 'rock4', 'cactus1', 'cactus2', 'cactus3', 'void'],

            'deepwater': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            'midlewater': [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0, 0, 0, 0.9],
            'water': [0, 0, 0, 0, 0.025, 0.025, 0.025, 0.025, 0, 0, 0, 0.9],
            'watersand': [0, 0, 0, 0, 0.025, 0.025, 0.025, 0.025, 0, 0, 0, 0.9],
            'sand': [0, 0, 0, 0, 0, 0, 0, 0, 0.034, 0.033, 0.033, 0.9],
            'grasssand': [0, 0.05, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.95],
            'grass': [0, 0.025, 0.025, 0, 0, 0, 0, 0, 0, 0, 0, 0.95],
            'tree': [0.034, 0.033, 0.033, 0, 0, 0, 0, 0, 0, 0, 0, 0.9],
            'dirt': [0, 0, 0, 0, 0, 0, 0.025, 0.025, 0, 0, 0, 0.95],
            'blackdirt': [0, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0.9],
            'stone': [0, 0, 0, 0, 0.025, 0.025, 0.025, 0.025, 0, 0, 0, 0.9],
            'stonesnow': [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0, 0, 0, 0.9],
            'snow': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            'gate': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        }
    }
}