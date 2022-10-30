'use strict';

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hey')('Arrow');

greet('Hello')('David');
console.log('\n\n');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);
console.log('\n');

//call method
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;
//book(23, 'Sarah Wiliams'); //does not work
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

//apply method - similar to call but takes in array arguments
const flightData = [583, 'Mary Cooper'];
book.apply(eurowings, flightData);
console.log(eurowings);

//optimized
book.call(lufthansa, ...flightData);
console.log(lufthansa);

//binding - binds to the same object its pointing to
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(23, 'Steve Williams');
bookLH(173, 'John Doe');
console.log(eurowings);
console.log(lufthansa);

const bookEH708 = book.bind(eurowings, 708);
bookEH708('John Doe');
bookEH708('Jane Doe');
console.log(eurowings);

//with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.16);
console.log(addVAT(200));

/*
 * *****************
 * CODE CHALLENGE #1
 * *****************
 */
const poll = {
  question: 'What is you favourite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    // if (typeof answer === 'number' && answer < this.answers.length)
    //   this.answers[answer]++;
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResult();
    this.displayResult('string');
  },
  displayResult(type = 'array') {
    if (type === 'array') console.log(this.answers);
    else if (type === 'string')
      console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const testData1 = [5, 2, 3];
const testData2 = [1, 5, 3, 9, 6, 1];

poll.displayResult.call({ answers: testData1 });
poll.displayResult.call({ answers: testData1 }, 'string');
poll.displayResult.call({ answers: testData2 });
poll.displayResult.call({ answers: testData2 }, 'string');

console.log('\n\n');
const runOnce = function () {
  console.log('This will never run again!');
};

//immediately invoked function expression (IIFE)
(function () {
  console.log('This will never run again!');
})();

(() => console.log('This will ALSO never run again!'))();

console.log('\n\n');

// closures -gives a function access to all variables from its parent function, even after the parent function has occured
// the function keeps a reference to its outer scope, which preserves the scope chain throughout time
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
console.log('\n');

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
const h = function () {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
console.dir(f);
h();
f();
console.dir(f);
//console.dir(f); //check scopes to find the its closure under scopes
console.log('\n');

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

/**
 * *****************
 * CODE CHALLENGE #2
 * *****************
 */

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
