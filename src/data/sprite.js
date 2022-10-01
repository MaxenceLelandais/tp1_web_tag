export const MAP = {

    src: '../assets/tiles.png',
    tileSize: 32,
    drawSize : 32,

    mapWidth: 30,
    mapHeight: 30,

    randomPositionnement : [0.3, 0.6, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
    defaultBackground : [0,0],
    startTile : 'deepwater',

    listTiles: {

        base : {
            'deepwater': [0,20], 
            'water': [0,18],
            'sand': [0,3], 
            'grass': [0,0],
            'wall': [0, 27],
            couches : {
                'deepwater': 1, 
                'water': 2,
                'sand': 3, 
                'grass': 4,
                'wall': 5,
            }
        }

    },
    
    decompress(nombre) {
        return [(nombre - nombre % 100)/100, nombre % 100];
    },

    compress(liste){
        return liste[0] * 100 + liste[1]
    },

    reverseTiles(dictionnary) {

        const newDictionnary = {};
        Object.keys(dictionnary).forEach(key => {
            newDictionnary[dictionnary[key]] = key;
        })

        return newDictionnary;
    },

    background: {
        conditions: ['deepwater', 'water', 'sand', 'grass','wall'],
        'deepwater': [0.95,0.05,0,0,0],
        'water': [0.4,0.5,0.1,0,0],
        'sand': [0,0.1,0.75,0.1,0.05], 
        'grass': [0,0.1,0.1,0.75,0.05], 
        'wall': [0,0,0.1,0.1,0.8], 
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