// VARIABLES

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');

// add 'open' cards to a list
let toggledCards = [];

// set the move counter to zero
let moves = 0;

// sets the clock on or off
let clockOff = true;

let clockId;

// sets the time initially at 0
let time = 0;

// keeping track of matched pairs;
let matched = 0;

// game winning number of patches
const TOTAL_PAIRS = 8;

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // EVENT LISTENER FOR CARD
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)){

        // starts the clock
        if (clockOff) {
            startClock();
            clockOff = false;
        }
        //if a card is clicked, flip and show the card
        toggleCard(clickTarget);
        // add 'open' card to a list of open cards
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            addMove();
            checkForMatch(clickTarget);
           starScore();
        }
    }
    });



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



// FUNCTIONS

//shuffle the deck 
function shuffleDeck() {
    // assign the elements to be shuffled into the array that'll be passed through the shuffle
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}
shuffleDeck();


/*is the click valid?
function isClickValid(clickTarget) {
    if (clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length <= 2 &&
    !toggledCards.includes(clickTarget)
    );
}
*/

// if card is clicked, flip and show the card
function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// add 'open' card to a list of open cards
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

// check to see if the open cards are a match
function checkForMatch() {
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className
    ) { // if cards match, lock the cards open, and reset the array
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        matched++
        toggledCards = [];
        if (matched === TOTAL_PAIRS) {
            gameOver();
        }
    } else { // if cards don't match, flip cards back over and reset the array after 1 second
        setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards = [];
        }, 1000);
    }
}





// increase the move counter after each play
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

// check star score over the course of play
function starScore() {
    if (moves === 10 || moves === 20) {
        hideStar();
    }
}

// hide a store once specified moves are met
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
hideStar();
hideStar();



// start the clock when play starts
function startClock() {
    clockId = setInterval(() => {
        displayTime()
        time++;
       // console.log(time);
    }, 1000);
}
//startClock();

// modify the clock element's innerHTML property
function displayTime() {
    const clock = document.querySelector('.clock');
    //console.log(clock);
   clock.innerHTML = time;
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

   if (seconds <10) {
       clock.innerHTML = `${minutes}:0${seconds}`;
   } else {
       clock.innerHTML = `${minutes}:${seconds}`;
   }
}

// stopping the clock
function stopClock() {
    clearInterval(clockId);
}

// toggle the modal when the game finishes
function toggleModal() {
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
}
toggleModal() // open the Modal
toggleModal() // close the Modal

displayTime();
moves = 16;
starScore();

// write the scores to the modal
function writeModalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const moveStat = document.querySelector('.modal_moves');
    const starStat = document.querySelector('.modal_stars');
    const stars = getStars();

    timeStat.innerHTML = `Time = ${clockTime}`;
    starStat.innerHTML = `Stars = ${stars}`;
    moveStat.innerHTML = `Moves = ${moves}`;
    
}

// get number of stars displayed
function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    //console.log(starCount); 
    return starCount;
}


// cancel - closing the modal window
document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal();
});

// X - closing the modal window
document.querySelector('.modal_close').addEventListener('click', () => {
    toggleModal();
});

/* replay the game
document.querySelector('.modal_replay').addEventListener('click', () => {
    console.log('replay');
});
*/

// reset the game
function resetGame() {
    resetClock();
    resetMoves();
    resetStars();
    shuffleDeck();
    matched = 0;
    toggledCards = [];

    for (let i = 0; i<cards.length; i++) {
        cards[i].classList.remove('open', 'show', 'match');
    }
}

resetGame();

// reset the clock
function resetClock() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

// reset the move counter
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

// reset Stars
function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

// reset the cards
function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

// handling reset button
document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.modal_replay').addEventListener('click', replayGame);

// game over function stops clock, writes to the modal, toggles the modal
function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}

// close the modal on replay
function replayGame() {
    resetGame();
    toggleModal();
}