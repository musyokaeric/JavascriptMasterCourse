'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//DISPLAY USER ACCOUNT TRANSACTIONS
///////////////////////////////////

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //clears HTML elements

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; //sorted movements in ascending order

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${movement} €</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterBegin', html);
  }); //afterbegin starts from the last element
};

//CREATE USERNAMES FOR EACH ACCOUNT
///////////////////////////////////

const createUsernames = accs => {
  //foreach
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0]) //map method
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (account) {
  //display movements
  displayMovements(account.movements);
  //display balance
  calcDisplayBalance(account);
  //display summary
  calcDisplaySummaries(account);
};

//IMPLEMENTING LOGIN - EVENT HANDLER
////////////////////////////////////
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form from submitting/reloading
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  //optional chaining
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    updateUI(currentAccount);

    console.log('LOGIN');
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});

//IMPLEMENTING TRANSFERS - EVENT HANDLER
////////////////////////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recepient = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(recepient, amount);
  if (
    amount > 0 &&
    recepient &&
    amount <= currentAccount.balance &&
    recepient?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recepient.movements.push(amount);
    updateUI(currentAccount);
  }
});

//REQUEST LOAN - EVENT HANDLER
//////////////////////////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    console.log('LOAN GRANTED');
  }
  inputLoanAmount.value = '';
});

//CLOSE ACCOUNT - EVENT HANDLER
///////////////////////////////
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const index = accounts.findIndex(
    acc => acc.username === inputCloseUsername.value
  );

  if (
    inputCloseUsername.value === currentAccount.username &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    console.log(accounts);
    console.log('Deleted...');
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//SORTING MOVEMENTS - EVENT HANDLER
///////////////////////////////////
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//CALCULATE AND PRINT TOTAL BALANCE
///////////////////////////////////
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => (acc += mov), 0);
  labelBalance.textContent = `${account.balance} €`;
};

//CALCULATE DISPLAY SUMMARIES
/////////////////////////////
const calcDisplaySummaries = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = account.movements
    .filter(mov => mov <= 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(intrst => intrst >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE - takes a copy of the entire/part of an array - does not mutate
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//SPLICE - takes a way the entire/part of an array - mutates
arr.splice(-1);
arr.splice(1, 2); //position 1, deletes the next 2 elements
console.log(arr);

//REVERSE - mutates
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

//JOIN
console.log(letters.join(' - '));

//FIRST & LAST element of an array
arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr.at(-1));
console.log('jonas'.at(0));
console.log('\n');

//FOR & FOREACH - WITH ARRAYS
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  movement > 0
    ? console.log(`Movement ${i + 1}: You deposited ${movement}`)
    : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
}
console.log('\n');

// movements.forEach(function (movement) {
movements.forEach(function (movement, i, array) {
  //order of elements (variable, index, array)
  // movement > 0
  //   ? console.log(`You deposited ${movement}`)
  //   : console.log(`You withdrew ${Math.abs(movement)}`);
  movement > 0
    ? console.log(`Movement ${i + 1}: You deposited ${movement}`)
    : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
});
console.log('\n');

//FOR & FOREACH - WITH MAPS & SETS
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
console.log('\n');
const currenciesUniques = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUniques);
currenciesUniques.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
console.log('\n\n');

/**
 * *****************
 * CODE CHALLENGE #1
 * *****************
 */

let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  let catsJulia = [dogsJulia.at(0), ...dogsJulia.slice(-2)];
  console.log(catsJulia);

  dogsJulia.splice(0, 1);
  dogsJulia.splice(-2);

  const dogs = dogsJulia.concat(dogsKate);

  dogs.forEach(function (age, i, arr) {
    const old = age >= 3 ? 'an adult' : 'still a puppy';
    console.log(`Dog number ${i + 1} is ${old}, and is ${age} years old`);
  });
};
checkDogs(dogsJulia, dogsKate);
console.log('\n\n');

// ARRAY MAP METHOD - does not mutate
const eurToUsd = 1.1;

const movementsUSD = movements.map(movement => movement * eurToUsd);
console.log(movements);
console.log(movementsUSD);
console.log('\n');

// ARRAY FILTER METHOD
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);
console.log('\n');

// ARRAY REDUCE METHOD
const balance = movements.reduce((acc, movement) => acc + movement, 0); //last parameter is the initial value to be added from -optional
console.log(balance);
// use reduce method to get maximum value
const maxMovement = movements.reduce((acc, movement) => {
  if (acc > movement) return acc;
  else return movement;
}, movements.at(0));
console.log(maxMovement);
console.log('\n');

/**
 * *****************
 * CODE CHALLENGE #2
 * *****************
 */
const calculateAverageHumanAge = function (dogs) {
  const humanAges = dogs.map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4));
  return humanAges;
};
const data1 = [5, 2, 4, 1, 15, 8, 3];
const dogAges = calculateAverageHumanAge(data1);
console.log(dogAges);

const adultDogs = dogAges.filter(age => age >= 18);
console.log(adultDogs);

// const adultDogAverage =
//   adultDogs.reduce((age, dog, i, arr) => age + dog, 0) / adultDogs.length;
const adultDogAverage = adultDogs.reduce(
  (age, dog, i, arr) => age + dog / arr.length,
  0
);
console.log(adultDogAverage);
console.log('\n');

//THE MAGIC OF CHAINING THE METHODS
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
console.log('\n');

/**
 * *****************
 * CODE CHALLENGE #3
 * *****************
 */
// chaining from challenge #2
const humanAges = data1
  .map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4))
  .filter(age => age >= 18)
  .reduce((age, dog, i, arr) => age + dog / arr.length, 0);
console.log(humanAges);
console.log('\n\n');

// ARRAY FIND, SOME & EVERY METHOD
const firstWithdrawal = movements.find(mov => mov < 0); //first
console.log(firstWithdrawal);
console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
console.log('\n');
const anyDeposits = movements.some(mov => mov > 1500); //any
console.log(anyDeposits);
console.log(movements.every(mov => mov > 0));
console.log('\n');

//ARRAY FLAT & FLATMAP METHODS
arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //flattens to one array
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); //2 levels deep
const allBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(allBalance);

const allBalanceFlatMap = accounts
  .flatMap(acc => acc.movements) //combination of flat + map
  .reduce((acc, mov) => acc + mov, 0);
console.log(allBalanceFlatMap);
console.log('\n');

//ARRAY SORTING
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
owners.sort(); //mutates
console.log(owners);
console.log(movements.sort()); // sorts number like a string
movements.sort((a, b) => a - b); // sorts numbers ascending
console.log(movements);
movements.sort((a, b) => b - a); //sorts numbers descending
console.log(movements);
console.log('\n');

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    element => Number(element.textContent.replace(' €', ''))
  );
  console.log(movementsUI);
});

// ARRAY METHODS PRACTICE
/////////////////////////

//1. sum of bank deposits of all accounts
const bankDepositSUM = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSUM);

//2. number of deposits greater than 1000
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, mov) => (mov > 1000 ? count + 1 : count), 0);
//.filter(mov => mov > 1000).length;
console.log(numDeposits1000);

//3. calculate sum of deposits & withdrawals
const { deposits2, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, mov) => {
      // mov > 0 ? (sums.deposits2 += mov) : (sums.withdrawals += mov);
      sums[mov > 0 ? 'deposits2' : 'withdrawals'] += mov;
      return sums;
    },
    { deposits2: 0, withdrawals: 0 }
  );
console.log(deposits2, withdrawals);

//4. convertany string to a title case
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(
      word =>
        exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1) //doesnt operate on words in exceptions
    )
    .join(' ');
  return titleCase;
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is a another title with an EXAMPLE'));

/**
 * *****************
 * CODE CHALLENGE #4
 * *****************
 */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(function (dog, i, array) {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahsDog);

const ownersEatTooMuch = dogs
  .filter(dog => (dog.curFood - dog.recFood) / 100 > 0.1)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => (dog.curFood - dog.recFood) / 100 < 0.1)
  .flatMap(dog => dog.owners);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too much!`);

console.log(dogs.some(dog => dog.curFood === dog.recFood));
console.log(
  dogs.some(
    dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);
const okayDogs = dogs.filter(
  dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
);
console.log(okayDogs);

const sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);
