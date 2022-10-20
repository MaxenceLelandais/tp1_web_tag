import { restoreScore } from "../model/score.js";

export function Leaderboard() {
    const leaderboard = $(`
        <div class="wrapper">
            <div class="leaderboardSection">
                <div class="leaderboardtabs">
                    <div class="leaderboard">
                        <ul>
                            <li class="active">Score</li>
                            <li>Classe</li>
                            <li>Map</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `);

    leaderboard.append(restoreScore);

    return leaderboard;
}

/*
    <div class="wrapper">
        <div class="leaderboardSection">
            <div class="leaderboardtabs">
                <div class="leaderboard">
                    <ul>
                        <li class="active">Score</li>
                        <li>Classe</li>
                        <li>Map</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
*/
