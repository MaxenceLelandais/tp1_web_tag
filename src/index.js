import $ from 'jquery';
import {fillScore, startButton, tableauMeilleurScore}
  from '../src/components/leaderboard.js';

$('body').append(tableauMeilleurScore()); // avec le score
$('#boutonPartie').append(startButton());
fillScore();
