const noJoueur = 'noJoueur';
let listeJoueur = [];

export function enregistrerScore(nomJoueur, classeJoueur, mapChoisie, score) {
  let compteur = 0;
  const index = [];

  listeJoueur.forEach( (joueur) => {
    if ( parseInt(joueur.split('-')[3] <= score)) {
      index.push(compteur);
    }
    compteur++;
  });

  if (index != null) {
    listeJoueur = listeJoueur.insert(index[0], nomJoueur + '-' + classeJoueur +
            '-' + mapChoisie + '-' + score);
  }

  listeJoueur.slice(0, 9);

  localStorage.setItem(noJoueur, JSON.stringify(listeJoueur.splice(0, 10)));
}

export function restoreScore() {
  const retrievedScore = localStorage.getItem(noJoueur);
  const array = [];

  if (retrievedScore !== null) {
    // const score = JSON.parse(retrievedScore);
    listeJoueur = retrievedScore.split(',');

    listeJoueur.forEach( (element) => {
      array.push(element);
    });

    listeJoueur = array.splice(0, 10);
  }

  return listeJoueur;
}
