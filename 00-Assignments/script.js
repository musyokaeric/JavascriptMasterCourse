"use strict";

console.log("hello world");
console.log("\n");

//#region 07/13 - DOM and Events (UI)
///////////////////////////////////////////////////////////

// // Selecting elements
// document.querySelector(".class-name");
// document.querySelectorAll(".class-name");
// document.getElementsByTagName("button"); //returns a collection list, that can update automatically when manipulated in the browser
// console.log(document.documentElement); //html
// console.log(document.head); //head
// console.log(document.body); //body

// // // Manipulating elements
// // document.querySelector("element-name").textContent;
// // document.querySelector("#id-name").value;

// // Handling click events
// document.querySelector(".class-name").addEventListener("", function (e) {
//   e.preventDefault(); // Disables html click events like submit and links
// });
// document.querySelector(".class-name").blur(); // Removes focus if it was a form element

// // Manipulating CSS styles
// document.querySelector("body").style.backgroundColor = "red";
// getComputedStyle(document.querySelector("body")).color; //returns css properties of the element
// document
//   .querySelector("body")
//   .style.setProperty("--color-primary", "orangered"); //manipupates root property variables

// // Working with attributes
// document.querySelector("img").alt = "new image description";
// document.querySelector("img").getAttribute("src");
// document.querySelector("img").setAttribute("src", "../img.png");

// // Working with classes
// document
//   .querySelector(".class-name")
//   .classList.add("new-class", "another-class");
// document.querySelector(".class-name").classList.remove("new-class");
// document.querySelector(".class-name").classList.toggle("new-class");
// document.querySelector(".class-name").classList.contains("new-class");

// // Handling global or keyboard events (ESC. key)
// // > keydown - press key
// // > keypress - press and hold
// // > keyup - lift finger from key
// document.addEventListener("keydown", function (e) {
//   e.preventDefault();
//   console.log(e.key, e.code);
// });

// // Implementing smooth scrolling
// document.addEventListener("click", function (e) {
//   document
//     .querySelector(".section-name")
//     .scrollIntoView({ behavior: "smooth" });
// });

// // Page navigation using event delegation
// document.querySelector(".nav-links").addEventListener("click", function (e) {
//   if (e.target.classList.contains("nav-link")) {
//     e.preventDefault();
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });

// // Creating an inserting elements
// document.querySelector(".class-name").insertAdjacentHTML("afterBegin", html); //afterbegin starts from the last element
// document.createElement("div");
// document.querySelector("header").prepend(document.querySelector(".classname")); //'prepend' inserts before another element. 'append' inserts after the element
// document.querySelector(".class-name").cloneNode(true); //creates a clone of the element
// document.querySelector("header").before(document.querySelector(".classname")); //inserts an element before
// document.querySelector("header").after(document.querySelector(".classname")); //inserts an element after
// document.querySelector(".class-name").remove(); //deletes elements

// // DOM traversing
// const h1 = document.querySelector("h1");
// h1.querySelectorAll(".child-element"); //gets all h1 child elements
// h1.childNodes; // gets child elements, returns node list
// h1.children; // gets direct child elements, returns collection list
// h1.firstElementChild; // gets first child element
// h1.lastElementChild; // gets last child element

// h1.parentNode; // gets direct parent element
// h1.parentElement; // gets direct parent element

// h1.closest(".header"); // gets the first parent element

// h1.previousElementSibling; // gets the previous sibling
// h1.nextElementSibling; // gets the next sibling

// h1.parentElement.children; // get parent element's children / all siblings

// // Using the Intersection Observer API to implement sticky nav
// const stickyNav = (entries) => {
//   const [entry] = entries;
//   if (!entry.isIntersecting)
//     document.querySelector("nav").classList.add(".sticky");
//   else document.querySelector("nav").classList.remove(".sticky");
// };
// const observerOptions = {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${
//     document.querySelector("nav").getBoundingClientRect().height
//   }px`,
// };
// const observer = new IntersectionObserver(stickyNav, observerOptions);
// observer.observe(document.querySelector("header"));

// // Reveal elements on scroll.
// // Css style for hiding a section
// // .section-hidden{
// //   opacity: 0;
// //   transform: translateY(8rem);
// // }
// const allSections = document.querySelectorAll(".section");

// const revealSection = (entries, observer) => {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("section-hidden");
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach((section) => {
//   sectionObserver.observe(section);
//   section.classList.add("section-hidden");
// });

// 203. Efficient Script Loading: defer and async

///////////////////////////////////////////////////////////
//#endregion

//#region 09/12 - Data structures, modern operators, strings, numbers, dates, intl and timers
///////////////////////////////////////////////////////////

// const restaurant = {
//   name: "Classico Italiano",
//   location: "Via Angelo Tavanti 23, Firenze, Italy",
//   categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
//   starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
//   mainMenu: ["Pizza", "Pasta", "Risotto"],

//   //ES6 enhanced object literals => points to already declared object
//   //openingHours,

//   //ES6 new way of writing functions in objects
//   order(starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },

//   orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time, address }) {
//     console.log(
//       `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
//     );
//   },
//   orderPasa: function (ing1, ing2, ing3) {
//     console.log(
//       `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
//     );
//   },
// };

// // Destructuring arrays
// const arr = [4, 5, 6];
// let [a, b, c] = arr;
// let [x, , y] = arr; // skip elements
// console.log(a, b, c);
// console.log(x, y);

// [x, y] = [y, x]; //swapping/mutating variables
// console.log(x, y);

// const nested = [2, 4, [5, 6]]; //destructuring nested arrays
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Destructuring objects
// const obj = {
//   p1: "property 1",
//   p2: "property 2",
//   p3: "property 3",

//   n1: { v1: "value 1", v2: "value 2", v3: "value 3" },

//   fn1() {
//     return "function 1";
//   },
// };
// let { p1, p2, p3 } = obj; //variables have to be similar to object properties
// console.log(p1, p2, p3);

// const { p1: p4, p2: p5, p3: p6 } = obj; //changing variable names
// console.log(p4, p5, p6);

// const {
//   n1: { v1: v3, v2: v4 },
// } = obj; //nested objects
// console.log(v3, v4);

// // Spread operator
// console.log(...arr);
// const leftArr = [1, 2, 3, ...arr];
// const rightArr = [...arr, 7, 8, 9];
// console.log(leftArr, rightArr);

// // Rest pattern and operators (opposite of spread => compress)
// const [f, g, h, ...others] = [...leftArr, 7, 8, 9];
// console.log(f, g, h, others);
// const { v1, ...objs } = obj.n1;
// console.log(objs);

// // Short circuiting (short circuit evaluation) (&& and || && ??)
// console.log(true || false); //returns a truthy value
// console.log(true && false); //returns a falsy value
// const job = "";
// console.log(job ?? "john"); //returns a non-nullable value (except 0 or '')

// // Sets - get unique values
// const newSet = new Set([3, 6, 2, 5, 8, 3, 6, 4]);
// const arrSet = [...newSet]; //convert set to array
// console.log(newSet, arrSet);
// newSet.forEach((value, key) => console.log(`${value}: ${n}`)); //with sets, keys are the same as values

// // Maps - similar to dictionaries
// const numbers = new Map();
// numbers.set(1, "one");
// numbers.set(2, "two").set(true, { bool: true });
// console.log(numbers);
// console.log(numbers.get(2));
// const mapObj = new Map(Object.entries(obj)); //convert obj to map
// console.log(mapObj);
// numbers.forEach((value, key) => console.log(`${key}: ${value}`));
// console.log("\n");

// // Working with strings
// const airline = "TAP Air Portugal";

// console.log(airline[0]); //T
// console.log(airline.length); //16
// console.log(airline.indexOf("r")); //6
// console.log(airline.lastIndexOf("r")); //10
// console.log(airline.indexOf("p")); //-1 (case sensitive)
// console.log(airline.slice(4)); //Air Portugal (start index)
// console.log(airline.slice(-8)); //Portugal (start from the end)
// console.log(airline.slice(4, 7)); //Air (start index, end index)
// console.log(airline.slice(0, airline.indexOf(" "))); //TAP
// console.log(airline.toLowerCase()); //tap air portugal
// console.log(airline.toUpperCase()); //TAP AIR PORTUGAL
// console.log(airline.includes("Air")); //true
// console.log(airline.startsWith("Air")); //false
// console.log(airline.endsWith("tugal")); //true

// const passenger = "jOnAs";
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect); //Jonas

// const loginEmail = " Hello@Eric.Io \n";
// const correctEmail = loginEmail.toLowerCase().trim();
// console.log(correctEmail); //hello@eric.io

// const priceGB = "288,97£";
// const priceUS = "$" + priceGB.replace("£", "").replace(",", ".");
// console.log(priceUS);

// const announcement = "All passengers to boarding door 23. Boarding door 23!";
// console.log(announcement.replace(/door/g, "gate")); //replace all

// const [firstName, lastName] = "Eric Musyoka".split(" ");
// const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
// console.log(newName); //Mr. Eric MUSYOKA
// console.log(newName.padStart(20, "*")); //****Mr. Eric MUSYOKA
// console.log(newName.padEnd(20, "*")); //Mr. Eric MUSYOKA****

// // Working with numbers
// const num = 0.1 + 0.2;
// console.log(num);
// // Convert to number
// console.log(+"23");
// console.log(Number("23"));
// console.log(Number.parseInt("30px   ")); //30
// console.log(Number.parseInt("  px30")); //NaN
// console.log(Number.parseFloat("   2.5rem   ")); //2.34
// console.log(Number.isNaN(+"asd4")); //true
// console.log(Number.isFinite(24 / 0)); //false

// // Math
// console.log(+(25.3463).toFixed(2)); //rounding decimals

// console.log(Math.trunc(25.4)); //removes decimal numbers - 25
// console.log(Math.round(25.6)); //rounds to the nearest int - 26

// console.log(Math.ceil(25.4)); //rounds up - 26
// console.log(Math.ceil(25.6)); //rounds up - 26

// console.log(Math.floor(25.4)); //rounds down - 25
// console.log(Math.floor(25.6)); //rounds down - 25

// console.log(Math.sqrt(25)); //square root
// console.log(25 ** (1 / 2)); //square root
// console.log(27 ** (1 / 3)); //cube root
// console.log(Math.max(1, 3, 5, "8", 3, 7)); //type conversion is allowed
// console.log(Math.min(1, 3, 5, 8, 3, 7));
// console.log(Math.PI * Number.parseFloat("10px") ** 2);

// // Generating a random number between 1 and 20
// const randomNumber = (number) => Math.trunc(Math.random() * number) + 1;
// console.log(randomNumber(20));
// // Generating a random number between two numbers
// const randomNumber2 = (min = 1, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;
// console.log(randomNumber2(null, 20));
// console.log(randomNumber2(2, 4));

// // Checking if number is even
// const isEven = (n) => n % 2 === 0;
// console.log(isEven(5)); //false

// // Working with dates and times
// console.log(new Date());
// console.log(new Date().toISOString()); //ISO format
// console.log(new Date().getFullYear());
// console.log(new Date().getMonth()); //zero-based
// console.log(new Date().getDay()); //day of the week
// console.log(new Date().getDate()); //day of the week
// console.log(new Date(0)); //1st Jan 1970 00:00:00 GTM(0)
// console.log(new Date().getTime()); //timestamp - milliseconds passed since 1st Jan 1970
// console.log(Date.now());

// // Calculate days passed
// const daysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// const days = daysPassed(new Date(2023, 5, 15), new Date(2023, 5, 25));
// console.log(days);

// // Internationalizing dates (Intl)
// const now = new Date();
// const locale = navigator.language; //get client locale
// const options = {
//   hour: "numeric",
//   minute: "numeric",
//   day: "numeric",
//   month: "long",
//   year: "numeric",
//   weekday: "long",
// };
// console.log(new Intl.DateTimeFormat(locale, options).format(now));
// console.log(new Intl.DateTimeFormat("sw-KE", options).format(now)); //swahili, Kenya
// // to get date locales, go to http://www.lingoes.net/en/translator/langcode.htm

// // Internationalizing numbers
// const number = 2342398754.32;
// const opt = {
//   style: "currency",
//   currency: "KES",
// };
// console.log(new Intl.NumberFormat("en-GB", opt).format(number));

// // setTimeout and setInterval
// setTimeout(() => {
//   console.log("After 1 second...");
// }, 1000);
// let interval = 2;
// const timer = setInterval(() => {
//   if (interval > 10) {
//     console.log("More than 10 seconds");
//     clearInterval(timer);
//   } else console.log(`After ${interval} seconds...`);
//   interval += 2;
// }, 2000);

///////////////////////////////////////////////////////////
//#endregion

//#region 11 - Arrays
///////////////////////////////////////////////////////////

// let arr = ["a", "b", "c", "d", "e"];
// let arr2 = ["i", "h", "g", "f", "e"];
// console.log(arr.slice()); // easiest way to copy an array
// console.log(arr.slice(2)); // does not change the original array
// console.log(arr.splice(-1)); // works in the same fasion as slice, but deletes the element(s) from the specified location
// console.log(arr); //returns the remaining elements
// console.log(arr.reverse()); //changes / mutates
// console.log(arr2.concat(arr)); // combines into one array
// console.log(arr.reverse().join(" - ")); // combines into string
// console.log(arr.at(0)); // similar to indexOf
// console.log(arr.at(-1));
// console.log(arr.includes("z")); //checks if exists

// // Data transformations
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // > foreach
// movements.forEach((value, index) => console.log(`${index}: ${value}`));
// // > map -> manipulates all the elements in that array
// const divider = 5;
// const newMovements = movements.map((m) => m / divider);
// console.log(newMovements);
// // > filter -> filter elements that satistfy the set condition
// const deposits = movements.filter((m) => m > 0);
// console.log(deposits);
// // > reduce -> 'reduces' all elements in the array to one single value eg. adding all elements
// const total = movements.reduce(
//   function (accumulator, value, index) {
//     console.log(`Iteration ${index}: ${accumulator}`);
//     return accumulator + value; //adds the current value to the accumulator
//   },
//   0 // initial value set to zero
// );
// const maximumValue = movements.reduce(
//   (accumulator, value) => (accumulator > value ? accumulator : value),
//   movements[0] //initial value
// );
// console.log(total, maximumValue);
// // > find and findIndex
// console.log(movements.find((m) => m < 0)); //returns first element, returns undefined/null if condition is false
// console.log(movements.findIndex((m) => m === -130));
// // > some -> same as includes, but includes a condition
// console.log(movements.some((m) => m > 0));
// // > every -> same as some, but returns true if all elements satisfy the condition
// console.log(movements.every((m) => m > 0));
// // > flat -> 'flattens' nested array into a single array
// // > flatMap -> combines map and flat methods
// const flatArr = [
//   [1, 2, 3],
//   [[4, 5, 6], 7, 8],
// ];
// console.log(flatArr.flat());
// console.log(flatArr.flat(2)); // 2 levels of nesting
// // > sorting
// arr2.sort(); // based on strings, ascending
// console.log(arr2);
// arr2.sort().reverse(); // based on strings, descending
// console.log(arr2);
// movements.sort((a, b) => a - b); // based on numbers, ascending
// console.log(movements);
// movements.sort((a, b) => b - a); // based on numbers, descending
// console.log(movements);

///////////////////////////////////////////////////////////
//#endregion

//#region 14 - OOP
///////////////////////////////////////////////////////////

// class Person {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   calcAge() {
//     return new Date().getFullYear() - this.birthYear;
//   }
//   get calcAgeGetter() {
//     return new Date().getFullYear() - this.birthYear; //getter
//   }
//   set fullName(name) {
//     this._fullName = `${name} Musyoka`; //setter
//   }
//   get fullName() {
//     return this._fullName; //getter
//   }

//   static hey() {
//     console.log("Hey static method"); //static method
//   }
// }
// const eric = new Person("Eric", 1992);
// console.log(eric);
// console.log(eric.calcAge());
// console.log(eric.calcAgeGetter);
// console.log(eric instanceof Person); //true

// console.log(eric.__proto__); // prototype
// Person.prototype.greet = function () {
//   console.log(`Hello ${this.fullName}`);
// };
// eric.greet();

// Person.greetStatic = function () {
//   console.log(`Hello static method`); //static method
// };
// Person.greetStatic();
// Person.hey();

// // Inheritance
// class Student extends Person {
//   constructor(fullName, birthYear, course) {
//     super(fullName, birthYear); //needs to happen FIRST!!
//     this.course = course;
//   }

//   calcAge() {
//     return "This method has been overriden";
//   }
// }

// const mike = new Student("Mike", 1989, "Architecture");
// console.log(mike.calcAge());

// console.log("\n");

// class Account {
//   locale = navigator.language; //public field
//   #transactions = []; //private field
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   get getTransactions() {
//     return this.#transactions;
//   }

//   // Public methods
//   deposit(amount) {
//     this.#transactions.push(amount);
//   }

//   withdraw(amount) {
//     this.#transactions.push(-amount);
//   }

//   requestLoan(amount) {
//     if (this.#approveLoan(amount)) {
//       this.deposit(amount);
//       console.log("Loan approved");
//     }
//   }

//   // Private methods
//   #approveLoan(amount) {
//     return true;
//   }
// }

// const acc1 = new Account("Jonas", "KES", 1111);
// acc1.deposit(250);
// acc1.withdraw(140);
// acc1.requestLoan(1000);
// // acc1.#approveLoan(1000); //error: private field not accessible
// console.log(acc1.getTransactions);
// // console.log(acc1.#transactions); //error: private field not accessible

///////////////////////////////////////////////////////////
//#endregion

//#region 16 - Asynchronous JS: Promises, Async/Await, and AJAX
///////////////////////////////////////////////////////////

// URLS to use:
// - https://restcountries.com/v3.1/
// You can get free APIs on https://github.com/public-apis/public-apis

// const renderCountry = function (data, className = "") {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.official}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} M people</p>
//             <p class="country__row"><span>🗣️</span>${
//               [...Object.values(data.languages)][0]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               [...Object.values(data.currencies)][0].name
//             }</p>
//           </div>
//         </article>
//   `;

//   document.querySelector(".countries").insertAdjacentHTML("beforeend", html);
//   document.querySelector(".countries").style.opacity = 1;
// };

// // AJAX XML HTTP Request call (old school)
//===========================================
// const getCountryAndNeighborOLD = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data); // get country

//     const neighbor = data.borders; // get neighbors
//     if (!neighbor) return;
//     neighbor.forEach((n) => {
//       // callback hell / nested asynchronous methods
//       const request2 = new XMLHttpRequest();
//       request2.open("GET", `https://restcountries.com/v3.1/alpha/${n}`);
//       request2.send();

//       request2.addEventListener("load", function (e) {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         renderCountry(data, "neighbour"); // get country
//       });
//     });
//   });
// };
// getCountryAndNeighborOLD("kenya");

// // Promises (new school)
//=========================

// const request = fetch("https://restcountries.com/v3.1/name/kenya");
// console.log(request);

// const getJson = (url, errMsg = "Something went wrong") =>
//   fetch(url).then((response) => {
//     // console.log(response);
//     if (!response.ok) throw new Error(`${errMsg}, ${response.status}`); // handle rejected promise
//     return response.json();
//   });

// const getCountryAndNeighborNEW = (country) => {
//   getJson(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders;
//       if (!neighbour)
//         throw new Error(`${data[0].name.official} has no neighbors`);

//       neighbour.forEach((n) => {
//         getJson(`https://restcountries.com/v3.1/alpha/${n}`).then((data) =>
//           renderCountry(data[0], "neighbour")
//         );
//       });
//     })
//     .catch(
//       (err) =>
//         console.log(`🔴 Something went wrong.
//     ${err}`) // handle rejected promise
//     )
//     .finally(() => {
//       document.querySelector(".countries").style.opacity = 1;
//     });
// };

// document.querySelector(".btn-country").addEventListener("click", function (e) {
//   getCountryAndNeighborNEW("australia");
// });

// getCountryAndNeighborNEW("kenya");

// // Building a simple promise
// const lotteryPromise = new Promise((resolve, reject) => {
//   console.log("Lottery draw is happening...");

//   setTimeout(() => {
//     if (Math.random() >= 0.5) resolve("You win!");
//     else reject("You lose");
//   }, 2000);
// });
// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => resolve(position),
//       (err) => reject(err)
//     );
//   });
// };
// getPosition().then((response) => console.log(response));

// // Async/Await
// const whereAmI = async function (country) {
//   try {
//     const response = await fetch(
//       `https://restcountries.com/v3.1/name/${country}`
//     );
//     const data = await response.json();
//     renderCountry(data[0]);
//     console.log(data);
//     return `You are in ${data[0].name.official}`;
//   } catch (err) {
//     console.error("Trouble getting data");
//   }
// };

// // Where order of output matters, use THEN/CATCH/FINALLY
//console.log("1: Getting location details");
// whereAmI("kenya")
//   .then((location) => console.log(`2: ${location}`))
//   .catch((err) => console.error(err))
//   .finally(() => console.log("3: Finished getting location"));

// // OR use IIFE (immediately invoked function expression)

// (async function () {
//   try {
//     const location = await whereAmI("kenya");
//     console.log(`2: ${location}`);
//   } catch (error) {
//     console.error(error);
//   }
//   console.log("3: Finished getting location");
// })();

// // Running promisses in parallel
// const get3countries = async function (c1, c2, c3) {
//   try {
//     // Promise.all => if one promise is rejected, the entire promise is rejected
//     const data1 = await Promise.all([
//       getJson(`https://restcountries.com/v3.1/name/${c1}`),
//       getJson(`https://restcountries.com/v3.1/name/${c2}`),
//       getJson(`https://restcountries.com/v3.1/name/${c3}`),
//     ]).then((data) => data.flatMap((d) => d[0].capital));

//     // Promise.race => the first fulfilled/reject promise wins the race. If there is no output within the allocated timeout, the entire promise gets rejected
//     const timeout = function (sec) {
//       return new Promise((_, reject) => {
//         setTimeout(() => {
//           reject(new Error("Request took too long!"));
//         }, sec * 1000);
//       });
//     };

//     const data2 = await Promise.race([
//       getJson(`https://restcountries.com/v3.1/name/${c1}`),
//       getJson(`https://restcountries.com/v3.1/name/${c2}`),
//       getJson(`https://restcountries.com/v3.1/name/${c3}`),
//       timeout(1),
//     ])
//       .then((data) => data[0].capital)
//       .catch((err) => console.error(err));

//     // Promise.allSettled => returns the results of all fulfilled/rejected promises
//     const data3 = await Promise.allSettled([
//       Promise.resolve("Success"),
//       Promise.reject("ERROR"),
//       Promise.resolve("Another success"),
//     ]).then((data) => data.map((d) => d.status));

//     // Promise.any => returns the first fulfilled promise
//     const data4 = await Promise.any([
//       Promise.reject("ERROR"),
//       Promise.reject("Another ERROR"),
//       Promise.resolve("Success"),
//     ]);

//     console.log(data1);
//     console.log(data2);
//     console.log(data3);
//     console.log(data4);
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3countries("kenya", "uganda", "tanzania");

///////////////////////////////////////////////////////////
//#endregion

//#region 17 - Modern JS Development: Modules, Tooling and Functional
///////////////////////////////////////////////////////////

// Importing and exporting ES6 modules

// IMPORTANT: for the import to function, you have to add 'type=module' on the script tag in the html file
// IMPORTANT: imported variables and functions should have 'export' written before

// Importing a variable, has to be the same name, use script file for reference
// Later: 278. Bundling with parcel and npm, 279. Configuring babel and polyfilling

///////////////////////////////////////////////////////////
//#endregion
