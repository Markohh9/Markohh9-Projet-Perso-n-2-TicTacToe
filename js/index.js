//chargement des infos utiles

const statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif = "X";
let etatJeu = ["", "", "", "", "", "", "", "", ""];
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
const gagne = () => `Le Joueur ${joueurActif} a gagné`;
const egalite = () => "Egalité";
const tourJoueur = () => `C'est autour du joueur ${joueurActif}`;

statut.innerHTML = tourJoueur();

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));
document.querySelector("#recommencer").addEventListener("click", recommencer);

function gestionClicCase () {
    //récupération de l'index de la case cliquée
    const indexCase = parseInt(this.dataset.index)
    console.log(indexCase)
    // si l'info dans etatJeu est deja rempli donc différent de vide OU que le jeu n'est pas actif alors je ne fait rien
    if(etatJeu[indexCase] !== "" || !jeuActif) {
        return
    }

    etatJeu [indexCase]= joueurActif 
    this.innerHTML = joueurActif

    verifWin()


}

function verifWin(){
    let tourGagnant = false

    for(let conditionWin of conditionWins){
        let val1 = etatJeu[conditionWin[0]]
        let val2 = etatJeu[conditionWin[1]]
        let val3 = etatJeu[conditionWin[2]]
        if(val1 == "" || val2 == "" || val3 ==""){
            continue
        }
        if (val1 == val2 && val2 == val3){
            tourGagnant = true
            break
        }
    }
    if (tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }

    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }
// Le joueur actif est egal a X si ou = O sinon = X (ternaire)
    joueurActif = joueurActif == "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

function recommencer(){
    joueurActif = "X";
    jeuActif = true;
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}