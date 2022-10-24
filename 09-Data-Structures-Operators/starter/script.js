'use strict';

// Data needed for first part of the section
const weekdayz = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  [weekdayz[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enhanced object literals => points to already declared object
  openingHours,

  //ES6 new way of writing functions in objects
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasa: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
};
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
});

//destructuring arrays
let [first, second, third, fourth] = restaurant.categories;
console.log(first, second, third, fourth);
//swapping or mutating array variables
[first, second] = [second, first];
console.log(first, second);
//receive 2 return values from a function
console.log(restaurant.order(2, 0));
//nested array
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);
console.log('\n');

//destructuring objects - specify name of the properties
const { name, openingHourz, categories } = restaurant;
console.log(name, openingHourz, categories);
//assign new names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
//swapping or mutating object variables
let a = 111,
  b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); //have to be in within the parenthesis
console.log(a, b);
//nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
console.log('\n');

//the spread operator
const arr = [7, 8, 9];
const goodArr = [1, 2, ...arr]; //spread operator
console.log(goodArr);
console.log(...goodArr); //logs individual elements
//spread operators work with iterables: arrays, strings, object variables, maps & sets, NOT LITERATL OBJECTS OR TEMPLATE LITERALS => ${} = values separated by commas
const str = 'Jonas';
console.log(...str);
const ingredients = ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'];
restaurant.orderPasa(...ingredients);
//using spread operator in objects
const newRestaurant = { foundedIn: 1978, ...restaurant };
console.log(newRestaurant);
console.log('\n');

//rest patterns and parameters = opposite of spread. collects elements from the LEFT of the variable into a new collection/array = variables separated by commas
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
const x = [1, 2, 3, 4, 5];
add(...x);
console.log('\n');

//short circuiting(|| and &&)
console.log(3 || 'Jonas'); // ---||--- takes truthy values first - values that evaluate to True in a boolean context
//restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
const guests2 = restaurant.numGuests || 10; //alternative
console.log(guests2);
console.log(3 && 'Jonas'); // ---&&--- takes falsy value - values that evaluate to False in a boolean context
console.log('\n');

//nullish coalescing operator -- takes null and undefined values
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
console.log('\n');

/*********************
 * CODING CHALLENGE #1
 *********************
 */
//Football: teams and their players
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrusia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnabry',
      'Lewandoski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witzel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandoski', 'Gnabry', 'Lewandoski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...player) {
    let arr = [];
    for (let i = 0; i < player.length; i++) {
      let goals = 0;
      if (arr.includes(player[i]) === false) {
        for (let j = 0; j < game.scored.length; j++) {
          if (game.scored[j] === player[i]) goals++;
        }
        arr.push(player[i]);
      } else {
        continue;
      }
      console.log(`${player[i]}: ${goals}`);
    }
  },
};
//1. create player arrays for each team
const [players1, players2] = game.players;
console.log(players1, players2);
//2. create a variable with the goalkeeper, and an array of the remaining 10 players
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
//3. create an array containing all players from both teams
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
//4. add 3 substitutes from players1
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
//5. create one variable for each game odd, while at it, assign x to an new variable draw
//const { team1, x: draw, team2 } = game.odds;
//OR
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);
//6. function that receives an arbitrary number of players and checks how many goals each player scored
game.printGoals(...game.scored);

//7. check which team is more likely to win (lowest odds). do not use if/else or tenary operator
team1 < team2 && console.log('Team 1 is more likely to win'); //using falsy
console.log('\n\n');

//for-of loop and destructuring
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of fullMenu) console.log(item);
for (const item of fullMenu.entries()) console.log(item);
for (const [i, el] of fullMenu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
console.log(`\n`);
//use entries, keys and values
const entries = Object.entries(openingHours);
//[key,{value}]
for (const [key, { open, close }] of entries) {
  console.log(`On ${key}, we open at ${open}, and close at ${close}`);
}
console.log(`\n\n`);

//optional chaining (?.)
//check if mon exists in restaurant.openingHours object
//if mon exists, then display open property, else print undefined
console.log(restaurant.openingHours.mon?.open);
for (const day of weekdayz) {
  //using optional chaining and nullish coallescing
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we are ${open}`);
}
console.log(`\n\n`);

/*********************
 * CODING CHALLENGE #2
 *********************
 */
//1. Loop over game.scored array and print each player name into the console
for (const [goal, scorer] of game.scored.entries())
  console.log(`Goal ${goal + 1}: ${scorer}`);
console.log(`\n`);
//2. Use loop to calculate average odds
const averageOdds = function () {
  let sum = 0;
  for (const odd of Object.values(game.odds)) {
    console.log(odd);
    sum += odd;
  }
  return sum / Object.values(game.odds).length;
};
console.log(averageOdds());
console.log(`\n`);
//3. Print the 3 odds to the console, but in a nice formatted way
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : game[team];
  console.log(`Odd of ${teamStr}: ${odd}`);
}
//4. Create an object called scorers which contain the names of the players who scored as properties, and number of goals as values
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
console.log('\n\n\n');

//Sets - gets unique elements, there are no indexes ( it is not an array!)
const orderSet = new Set(['Pasta', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(orderSet);
console.log(new Set('Jonas').size); //prints char set
console.log(orderSet.has('Pizza'));
orderSet.add('Garlic Bread');
orderSet.delete('Risotto');
console.log(orderSet);
console.log([...orderSet]); //converts to array
console.log('\n\n');

//Maps - similar to c# dictionaries
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Flirenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));
rest
  .set('categories', restaurant.categories)
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.has('categories'));
console.log(rest.delete(2));
console.log(rest.size);

const time = 21;
console.log(rest.get(time >= rest.get('open') && time <= rest.get('close')));
console.log(rest.set(document.querySelector('h1'), 'Heading'));
console.log('\n');
const question = new Map([
  ['question', 'What is the best programming languate in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct 🍕'],
  [false, 'Try again'],
]);
console.log(question);
console.log('\n');
//convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
console.log('\n');
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = 3;
console.log(question.get(answer));
console.log(question.get(question.get('correct') === answer));
//convert map to array
console.log([...question]);

//Data structures:
//Simple list - Arrays or sets
//Key/Value pairs - Objects or maps
console.log('\n\n');

/*********************
 * CODING CHALLENGE #3
 *********************
 */
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔃 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔃 Substitution'],
  [64, '🟡 Yellow Card'],
  [69, '🔴 Red Card'],
  [70, '🔃 Substitution'],
  [72, '🔃 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🟡 Yellow Card'],
]);
//1. Array 'events' of unique game events that happened.
const events = [...new Set([...gameEvents.values()])];
console.log(events);
//2, Remove yellow card from event 64
gameEvents.delete(64);
console.log(gameEvents);
//3. Compute strin to display "An event happened, on average, every x minutes". keep in mind game last 90 mins
const timeSpan = [...gameEvents.keys()].pop(); //removes last item - 92 mins
console.log(
  `An event happened, on average, every ${timeSpan / gameEvents.size} minutes`
);
//4. Loop over gameEvent marking when its the first or second half
for (const [key, value] of gameEvents) {
  const half = key <= 45 ? '[FIRST HALF]' : '[SECOND HALF]';
  console.log(`${half} ${key}: ${value}`);
}
console.log('\n\n\n');

const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log(airline.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Air'));
console.log(airline.slice(4));
console.log(airline.slice(1, -1)); //negative index will start counting from the end
console.log(airline.slice(0, airline.indexOf(' ')));

const passenger = 'jOnAs'; //to 'Jonas' output
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); //rid of whitespaces
console.log(trimmedEmail);
console.log(trimmedEmail === email);
const priceUS = '$288.97';
const priceGB = priceUS.replace('$', '₤').replace('.', ',');
console.log(priceGB);
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace(/door/g, 'gate')); //alternative to replaceAll - regex
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
const newName = ['Mr.', firstName, lastName].join(' ');
console.log(newName);
//fill the beginning or end of the entire string to a particular length with a specified character
console.log(announcement.padStart(75, 'x'));
console.log(announcement.padEnd(75, 'x'));

const maskedCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*'); //hides all credit card details except for the last 4 digits
};
console.log(maskedCreditCard(245929395493));
console.log(maskedCreditCard('1212354534'));

const flightAlert = 'Bad Weather... All Departures Delayed... ';
console.log(flightAlert.repeat(5));
console.log('\n\n\n');

/*********************
 * CODING CHALLENGE #3
 *********************
 */
const camelCase = function (name) {
  let [first, second] = name.trim().toLowerCase().split('_');
  second = second[0].toUpperCase() + second.slice(1);
  return (
    (first + second[0].toUpperCase() + second.slice(1)).padEnd(20, ' ') + '✅'
  );
};

console.log(camelCase('underscore_case'));
console.log(camelCase('  first_name'));
console.log(camelCase('Some_Variable'));
console.log(camelCase('   calculate_AGE'));
console.log(camelCase('delayed_departure'));
console.log('\n');

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//Outpul
//🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//  🔴 Delayed Arrival from FAO to TXL (11h25)
//            Departure from BRU to FAO (11h45)

const flightArray = flights.split('+');
for (var flight of flightArray) {
  let [flightinfo, source, destination, time] = flight.split(';');
  flightinfo = flightinfo.slice(1).replace('_', ' ');
  if (flightinfo.includes('Delayed')) flightinfo = '🔴 ' + flightinfo;
  source = source.substring(0, 3).toUpperCase();
  destination = destination.slice(0, 3).toUpperCase();
  time = '(' + time.replace(':', 'h') + ')';

  console.log(
    (
      flightinfo +
      ' from ' +
      source +
      ' to ' +
      destination +
      ' ' +
      time
    ).padStart(50, ' ')
  );
}
