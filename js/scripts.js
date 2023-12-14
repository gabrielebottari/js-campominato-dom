/*
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html,
e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba,
perciò nell'array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.
*/

//dichiaro una costante sui livelli di difficoltà che voglio avere e con quante celle
const difficultyLevels = {
    easy: 100,
    medium: 81,
    hard: 49
};

//dichiaro una costante sul numero di bombe che voglio inserire
const bombCount = 16;

//dichiaro una costante griglia e l'associo al div con id grid
let grid = document.getElementById('grid');

//dichiaro una variabile con il punteggio iniziale a zero
let score = 0;

//funzione per far creare la griglia
function play() {

    //dichiaro una costante sulla selezione di difficoltà
    const select = document.getElementById('difficulty');

    //dichiaro due variabili in base a numero e difficoltà
    let cellsNumber;
    let difficultyClass;

    //in base alla difficoltà assegno un numero di celle e do una classe che su css indicherà la larghezza della cella
    if (select.value === '') {
        alert('Select difficulty before start the game.');
        return;
    }

    if (select.value === 'hard') {
        cellsNumber = 49;
        difficultyClass = 'hard';

    } else if (select.value === 'medium') {
        cellsNumber = 81;
        difficultyClass = 'medium';

    } else if (select.value === 'easy') {
        cellsNumber = 100;
        difficultyClass = 'easy';
    }

    //se ci sono già celle esco dalla funzione per non creare altre griglie
    if (document.querySelectorAll('.cell').length > 0) {
        return;
    }

    //richiamo la funzione
    generateCells(cellsNumber, difficultyClass);

}

//creo una funzione per generare le celle
function generateCells(cellsNumber, difficulty) {

    //creo una variabile per associare l'array di bombe utilizzando la funzione generate bombs
    let bombArray = generateBombs(cellsNumber);

    //faccio un ciclo in base al numero di celle dovuto alla difficoltà selezionata
    for (let i = 1; i <= cellsNumber; i++) {

        //creo un div per ogni ciclo
        const cell = document.createElement('div');

        //inserico il numero progressivo nella cella 
        cell.innerHTML = i;

        //aggiunge la variabile difficulty alla cella
        cell.classList.add('cell', difficulty);

        //inserisco la cella nella griglia
        grid.appendChild(cell);

        //al click sulla cella parte la funzione
        cell.addEventListener('click', function() {
                            
            //stampo in console il numero della cella
            console.log('You clicked on cell n° ' + this.innerHTML);

            //controllo se la cella cliccata è una bomba
            if (bombArray.includes(i)) {

                //aggiungo la classe bomb alla cella selezionata se è inclusa tra il numero di bombe generato casualmente
                this.classList.add('bomb');

                //termino il gioco
                endGame();

            //se non non ha classe active
            }else if (!this.classList.contains('active')) {

                //da classe active
                this.classList.add('active');

                //aumento il punteggio
                score++

                //mostro il punteggio
                console.log(`Your score: ${score}`)

                document.getElementById('scoreDisplay').innerHTML = `YOUR SCORE: ${score}`
                
                //se l'utente ha rivelato tutte le celle che non sono bombe
                if (score === (cellsNumber - bombCount)) {

                    //alert con il messagio di vittoria con punteggio
                    alert('Congratulations! You won! Your Score: ' + score);

                    //termino il gioco
                    endGame();

                }
            }
                    
        });

    }
}

//funzione per generare le bombe
function generateBombs(cellsNumber) {

    //creo un array vuoto
    let bombArray = [];

    //ciclo while di durata fino al numero di bombe dichiarato precedentemente
    while (bombArray.length < bombCount) {

        //dichiaro una variabile che creerà un numero casuale in base al numero di celle totali
        let bomb = Math.floor(Math.random() * cellsNumber) + 1;

        //se il numero non è dentro all'array
        if (!bombArray.includes(bomb)) {

            //lo inserico dentro
            bombArray.push(bomb);
        }
    }

    //restituisco l'array
    return bombArray;
}

// Funzione per terminare il gioco
function endGame() {

    //serve per permettere di far comparire il cambio di classe alla cella con la bomba
    setTimeout(function() {

        //messaggio di fine partita con punteggio
        alert('Game Over! Your total Score: ' + score);

        //aggiorna il punteggio
        updateScore();

        //funzione reset
        reset();

        //reimposto il punteggio a 0 per la prossima partita
        score = 0;
    
    //timeout a 0
    }, 0);

}

//funzione per aggiornare il punteggio nell'html
function updateScore() {

    scoreDisplay.innerHTML = 'Score: ' + score;
}

//funzione per il tasto reset che svuoterà il contenitore della griglia
function reset() {

    //svuota la griglia
    grid.innerHTML = '';

    //svuota il punteggio
    scoreDisplay.innerHTML = `YOUR SCORE: 0`;

}