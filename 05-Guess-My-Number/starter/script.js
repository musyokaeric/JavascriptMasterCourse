'use strict';

/*

DOM: DOCUMENT OBJECT MODEL
==========================
This is a structured representation of HTML documents.
Allows JavaScript to access HTML elements and stypes to manipulate them.

DOM TREE STRUCTURE
==================
Document
- <html> ELEMENT
    - <head> ELEMENT
        - <title> ELEMENT
            - "A Simple Page" TEXT
    - <body> ELEMENT
        - <section> ELEMENT
            - <img> ELEMENT
            - <p> ELEMENT
                - "A paragraph" TEXT
                - <a> ELEMENT
                    - "link" TEXT

DOM is not part of JavaScript, rather its a part of the modern web browsers
*/

//MANIPULATING ELEMENTS
//=====================
console.log(document.querySelector('.message'));
console.log(document.querySelector('.message').textContent);

//HANDLING CLICK EVENTS
//=====================
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    displayMessage('⛔ No number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
});
