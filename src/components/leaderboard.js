const noJoueur = 'noJoueur';
let listeJoueur = [];

export function enregistrerScore(nomJoueur, score) {
    
}

export function restoreScore() {
    const retrievedScore = localStorage.getItem('noJoueur');
    
    if(retrievedScore !== null) {
        const score = JSON.parse(retrievedScore);
        
    }

    return listeJoueur;
}