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
  JSON.parse(localStorage.getItem('listeJoueur')) : defaultScore;

  let emplacement = 0;
  for (emplacement in res.scores) {
    if (res.scores[emplacement].score<=score) {
      break;
    }
  }

  for (let post=res.scores.length; post>=emplacement; post--) {
    res.scores[post] = res.scores[post-1];
  }
  res.scores[emplacement] = {name: nomJoueur, score: score};
  if (res.scores.length >= 10) {
    res.scores[res.scores.Length].remove();
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
