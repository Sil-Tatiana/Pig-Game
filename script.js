'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player1Score = document.querySelector('#current--0');
const player2Score = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playingGame;

const removeDice = function () {
  diceEl.classList.add('hidden');
};

// Starting conditions
const init = function () {
  scores = [0, 0]; // Stores scores for both Players - index 0: Player 0 / index 1: Player1
  currentScore = 0;
  activePlayer = 0; // Set to Player 0
  playingGame = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  player1Score.textContent = 0;
  player2Score.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  removeDice();
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // We are reassigning activePlayer to the condition we are passing in
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playingGame) {
    // Generate a Random number between 1-6
    const dice = Math.trunc(Math.random() * 6) + 1; // we add 1 so our range starts from 1.
    console.log(dice);

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // We pass the dice variable that now will have a random number between 1 and 6, therefore our code becomes dinamic.

    // Checked if rolled 1

    // if No - Add the dice number to the current score
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      // we are creating a dynamic player/active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if yes - Switch Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingGame) {
    // Add current Score to Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if Final Score is >equal 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playingGame = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      removeDice();
    } else {
      // Switch to the other player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
