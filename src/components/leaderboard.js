import $ from 'jquery';
import {restoreScore} from '../model/score.js';
import {pageNewGame} from '../components/pageNewGame.js';

/**
 * Fonction pour obtenir le leaderboard avec les meilleurs scores.
 * @return {object} le leaderboard.
 */
export function tableauMeilleurScore() {
  const board = $(`
    <div class="wrapper">
        <div class="leaderboardSection">
            <div id="leaderboard">
                <ul>
                    <li id="nom">Nom</li>
                    <li id="score">Score</li>
                </ul>
            </div>
            <div id="boutonPartie">
            
            </div>
        </div>
    </div>`);

  return board;
}

/**
 * Fonction pour gérer le bouton pour démarrer une nouvelle partie.
 * @return {*}
 */
export function startButton() {
  const startBtn = $(`
    <button id="newGame" type="button" class="btn btn-primary">
        Démarrer la partie
    </button>
    `);
  startBtn.on('click', () => {
    $('body').append(pageNewGame());
    $('.wrapper').remove();
  });
  return startBtn;
}

/**
 * Fonction pour remplir le leaderboard.
 * @param {*} listeJoueur
 */
export function fillScore() {
  const listeJoueur = restoreScore();
  listeJoueur.scores.forEach((data)=> {
    const score = $(`
        <ul>
            <li>${data.name}</li>
            <li>${data.score}</li>
        </ul>
    `);
    $('#leaderboard').append(score);
  });
}
