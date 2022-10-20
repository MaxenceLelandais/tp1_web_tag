<<<<<<< HEAD
import $ from 'jquery';
import {pageNewGame} from './components/pageNewGame.js';

$('body').append(pageNewGame());
=======
//import { pageNewGame } from "./components/pageNewGame.js";
import { Leaderboard } from "./components/leaderboard.js";


$('body').append(Leaderboard()); //avec le score
//$('body').append(pageNewGame());
//directement dans le jeu
>>>>>>> main
