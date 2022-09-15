'use strict';

//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
let currentScore, activePlayer, scores, playing;
const init = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//rolling dice functionality
btnRollDice.addEventListener('click', function () {
  if (playing) {
    //1.Generating random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);
    //2.Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;
    //3.Check if rolled 1: If true, switch to next player
    if (diceNumber !== 1) {
      //Add diceNumber to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if score is >= 100 ? Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //3.Switch player
    else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
