import $ from 'jquery';
import {restoreScore} from '../model/score.js';

export function Leaderboard() {
  const leaderboard = $(`
        <div class="wrapper">
            <div class="leaderboardSection">
                <div class="leaderboardtabs">
                    <div class="leaderboard">
                        <ul>
                            <li class="active" data-li="score">Score</li>
                            <li data-li="classePerso">Classe</li>
                            <li data-li="map">Map</li>
                        </ul>
                    </div>
                </div>
                <button type="button" class="bouton"> Démarrer la partie</button>
            </div>
            
        </div>
    `);

    leaderboard.append(restoreScore);

  return leaderboard;
}

