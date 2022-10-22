import $ from 'jquery';
import {pageNewGame} from './components/pageNewGame.js';

import {Leaderboard} from './components/leaderboard.js';


// $('body').append(Leaderboard()); // avec le score
$('body').append(pageNewGame());
