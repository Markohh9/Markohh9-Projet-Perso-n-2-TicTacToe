//chargement des infos utiles

// renvoi du premier elt h2 récupéré dans le fichier HTML
const statut = document.querySelector("h2");
// déclaration variable jeu actif en true
let jeuActif = true;
// déclaration variable joueur actif assigné a X
let joueurActif = "X";
// déclaration de toutes les cases du morpion (9)
let etatJeu = ["", "", "", "", "", "", "", "", ""];
// déclaration de notre constante pour gagner avec donc toutes les conditions pour gagner la partie
const conditionWins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//messages 
//attribution de notre fonction pour afficher qui a gagner la partie
const gagne = () => `Le Joueur ${joueurActif} a gagné`;
//attribution de notre fonction pour afficher égalité si égalité il y a 
const egalite = () => "Egalité";
//attribution de notre fonction pour afficher le tour du joueur
const tourJoueur = () => `C'est autour du joueur ${joueurActif}`;
//création de notre texte pour indiquer sur la page quel joueur doit jouer
statut.innerHTML = tourJoueur();

// renvoi de notre elt .case en executant notre fonction sur chaque elt du tableau avec notre parametre cell + eventlistener avec notre fonction
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));
// renvoi de notre btn recommencer et ajout d'un event au click pour recommencer la partie
document.querySelector("#recommencer").addEventListener("click", recommencer);


function gestionClicCase () {
    //récupération de l'index de la case cliquée en analysant et renvoyant notre donnée
    const indexCase = parseInt(this.dataset.index)
    console.log(indexCase)
    // si l'info dans etatJeu est deja rempli donc différent de vide OU que le jeu n'est pas actif alors je ne fait rien
    if(etatJeu[indexCase] !== "" || !jeuActif) {
        return
    }

    // variable récupérant le tableau et indiquant le joueur devant jouer son tour + affichage de celui ci
    etatJeu [indexCase]= joueurActif 
    this.innerHTML = joueurActif
    // fonction pour vérifier si un joueur a gagné ou non
    verifWin()
}

// création de notre fonction pour savoir quelle sont les condition pour win
function verifWin(){
    let tourGagnant = false

//création de notre boucle for
    for(let conditionWin of conditionWins){
        let val1 = etatJeu[conditionWin[0]]
        let val2 = etatJeu[conditionWin[1]]
        let val3 = etatJeu[conditionWin[2]]
        //si notre variable 1 est vide et variable 2 est vide et variable 3 est vide alors on continue
        if(val1 == "" || val2 == "" || val3 ==""){
            continue
        }
        // si notre variable 1 est égal a notre variable 2 et que variable 2 est égal a notre variable 3 alors notre variable tourGagnant
        // passe en true et la boucle se termine
        if (val1 == val2 && val2 == val3){
            tourGagnant = true
            break
        }
    }
    //on continue dans la boucle avec notre fonction, si tour gagnant alors le joueur X ou O a gagné et on l'envoie sur la page et le 
    //jeu passe en inactif et renvoie avec return
    if (tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }
    //sinon notre variable etatJeu permet de determiner si notre tableau contient une valeur ou non, et determine l'égalité de la partie et le
    //jeu passe en inactif et renvoie avec return
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }


// Le joueur actif est egal a notre condition X si c'est vrai ou = O si c'est faux alors = X (fonction ternaire)
    joueurActif = joueurActif == "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

// création de notre fonction attribué au bouton pour recommencer
function recommencer(){
    // atribution de notre variable joueur Actif X ou O
    joueurActif = "X";
    // atribution de notre variable pour indiquer quelle joueur doit jouer
    jeuActif = true;
    // attribution des cases pour le morpion
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    // création sur la page de quelle joueur doit jouer ce tour
    statut.innerHTML = tourJoueur();
    // création de notre signe (X ou O) changeant avec le tour du Joueur et renvoie vers la page HTML pour indiquer dans le jeu ou le joueur se place
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}