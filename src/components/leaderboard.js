import $ from 'jquery';
import {restoreScore} from '../model/score.js';
import {pageNewGame} from '../components/pageNewGame.js';

/**
 * Fonction pour obtenir le leaderboard avec les meilleurs scores.
 * @return {object} le leaderboard.
 */
export function tableauMeilleurScore() {
  const board =$('<div class="wrapper"></div>')
      .append($('<div class="leaderboardSection"></div>')
          .append($(`<div class="leaderboard">
                      <ul>
                          <li id="score">Score</li>
                          <li id="classePerso">Classe</li>
                          <li id="map">Map</li>
                      </ul>
                  </div>`))
          .append(restoreScore))
      .append($('<div class="boutonPartie"></div>')
          .append($(`<button id="newGame" type="button" class="btn btn-primary">
                      Démarrer la partie
                  </button>`).on('click', () => {
            $('body').append(pageNewGame());
            $('.wrapper').remove();
          })));

  return board;
}

