export const MAP = {
  src: './assets/tiles.png',
  tileSize: 64,
  drawSize: 64,

  mapWidth: 10,
  mapHeight: 10,

  randomPositionnement: [0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
  randomFiltreLissage: 0.5,
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
    'gate': 14,
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
    'void': -1,
  },

  listTilesLayerObstacles: {
    3: 'treestump',
    4: 'rock1',
    5: 'rock2',
    8: 'cactus1',
    9: 'cactus2',
    10: 'cactus3',
  },


  reverseTiles(listTiles) {
    const newDict = {};
    Object.keys(listTiles).forEach((layer) => {
      newDict[listTiles[layer]] = layer;
    });
    return newDict;
  },

  typeTiles: {
    water: ['deepwater', 'midlewater', 'water'],
    grass: ['grass', 'tree'],
    sand: ['watersand', 'sand', 'grasssand'],
    dirt: ['dirt', 'blackdirt'],
    stone: ['stone', 'stonesnow', 'snow'],
  },

  background: {
    'conditions': [
      'deepwater', 'midlewater', 'water', 'watersand', 'sand', 'grasssand',
      'grass', 'tree', 'dirt', 'blackdirt', 'stone', 'stonesnow', 'snow',
    ],
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
      'conditions': [
        'poppy', 'yellowflower1', 'yellowflower2', 'treestump', 'rock1',
        'rock2', 'rock3', 'rock4', 'cactus1', 'cactus2', 'cactus3', 'void',
      ],

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
      'gate': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    },
  },
};

export const PLAYER = {
  width: 32,
  height: 36,
  initSpeed: 11,
  timer: 60,
  listClass: {
    'src': './assets/playerClass/',
    'type': '.png',
    'list': ['default', 'fisherman', 'forest', 'mountain', 'sand', 'snow'],
    'default': {
      effectsList: {},
    },
    'fisherman': {
      effectsList: {
        'deepwater': 3,
        'midlewater': 6,
        'water': 9,
        'watersand': 6,
        'tree': -2,
        'dirt': -3,
        'blackdirt': -4,
        'stone': -6,
        'stonesnow': -6,
        'snow': -7,
      },
    },
    'forest': {
      effectsList: {
        'deepwater': -4,
        'midlewater': -3,
        'water': -2,
        'grass': 3,
        'tree': 9,
        'dirt': 6,
        'blackdirt': 3,
        'stone': -2,
        'stonesnow': -4,
        'snow': -6,
      },
    },
    'mountain': {
      effectsList: {
        'deepwater': -9,
        'midlewater': -6,
        'water': -5,
        'watersand': -3,
        'sand': -2,
        'dirt': 2,
        'blackdirt': 4,
        'stone': 9,
        'stonesnow': 6,
        'snow': 6,
      },
    },
    'sand': {
      effectsList: {
        'deepwater': -5,
        'midlewater': -2,
        'water': 2,
        'watersand': 5,
        'sand': 9,
        'grasssand': 6,
        'blackdirt': -2,
        'stone': -3,
        'stonesnow': -5,
        'snow': -6,
      },
    },
    'snow': {
      effectsList: {
        'deepwater': -9,
        'midlewater': -6,
        'water': -5,
        'watersand': -3,
        'sand': -1,
        'dirt': 1,
        'blackdirt': 3,
        'stone': 6,
        'stonesnow': 10,
        'snow': 15,
      },
    },
  },

  player1: {
    commands: {
      'ArrowLeft': [3, [-1, 0]],
      'ArrowRight': [1, [1, 0]],
      'ArrowUp': [0, [0, -1]],
      'ArrowDown': [2, [0, 1]],
    },
  },

  player2: {
    commands: {
      'a': [3, [-1, 0]],
      'd': [1, [1, 0]],
      'w': [0, [0, -1]],
      's': [2, [0, 1]],
    },
  },
};
