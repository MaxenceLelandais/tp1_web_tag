/**
 * Fonction pour enregistrer sur le localStorage.
 * @param {*} nomJoueur le nom du joueur.
 * @param {*} score le score à la fin de la partie.
 */
export function enregistrerScore(nomJoueur, score) {
  const defaultScore = {
    scores: [
      {
        name: '',
        score: 0,
      },
    ],
  };
  const res = localStorage.getItem('listeJoueur') !==null ?
  localStorage.getItem('listeJoueur') : defaultScore;

  res.scores.push({name: nomJoueur, score: score});

  scores.sort();
  // sort par score le plus grand
  // trim si plus grand que 10
  if (scores.Length >= 10) {
    scores[scores.Length].remove();
  }

  localStorage.setItem('listeJoueur', JSON.stringify(res));
}

/**
 * Fonction pour retourner le localStorage.
 * @return {object} le localStorage.
 */
export function restoreScore() {
  const defaultScore = {
    scores: [
      {
        name: '',
        score: 0,
      },
    ],
  };
  const scores = localStorage.getItem('listeJoueur') !==null ?
  JSON.parse(localStorage.getItem('listeJoueur')) : defaultScore;

  return scores;
}
