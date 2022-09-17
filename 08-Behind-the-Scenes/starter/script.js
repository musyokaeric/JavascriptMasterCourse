'use strict';

/**Call stack: place where the execution context gets stacked on top of each other, to keep track of where we are in the execution -- how the code is executed */

/**Execution context: environment in which a piece of js is executed. What's inside an execution context:
 * - scope chain > reference to variables located outside of the variable environment
 * - variable environment > let, const, var, functions, arguments objects
 * - this keyword > special variable that is created for every execution context/function
 */

/**Scoping: controls how our program's variables are organized and accessed/declared
 * Lexical scoping: the way variables are organized and accessed is entirely controlled by placement of functions and blocks in the program's code
 * Scope: space or environment in which a certain variable is declared:
 * - global scope (accessed outside any function or block)
 * - function scope (accessed only inside the function. also called local scope)
 * - block scope (accessed only inside blocks eg. if, for loop blocks. this only applies to let and const variables. in es6, functions are also blocked scoped only in strict mode)
 * Scope of a variable: entire region of our code where a certain variable can be accessed
 */

/**Variable environment: how the variables are created in javascript
 * - hoisting > makes some type of variables accessible/usable in code before they are actually declared (variables lifted to the top of their scope/line of code). var <default value is undefined> & function declarations are hoisted, let & const are not as their default value is <unitialized>
 * - TDZ / temporal dead zone - area where let and const variables are accessed before they are initialized eg. accessing the variable at line 2 when it was initialized at line 5. makes it easier to avoid and catch errors
 */

/**this keyword: takes the value of the "owner" of the function in which this keyword is used. its not static, only assigned when the function is actually called
 * - method > this keyword is the object calling the method
 * - simple function call > this keyword is undefined
 * - arrow functions > this keyword of the sorrounding function
 * - event listener > this is the dom keyword that the handler is attached to
 * - new, call, apply, bind > tackled later in the course
 */
console.log(this); //points to global window object / parent scope
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //points to function which is undefined because it was not assigned to a variable
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); //points to global window object / parent scope
};
calcAgeArrow(1991);
console.log('\n');

const Jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); //points to Jonas object
    console.log(2037 - this.year); //points to Jonas.year

    const self = this; //points to Jonas object
    const isMillenial = function () {
      //console.log(this.year >= 1981 && this.year <= 1996); //this.year by default is undefined
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial();
    const newGreet = () => console.log(`Hey ${this.firstName}`); // points to Jonas object
    newGreet();
    console.log('\n');
  },
  greet: () => console.log(`Hey ${this.firstName}`), // arrow functions are undefined by default, this keyword will point to undefined
};
Jonas.calcAge();

const matilda = {
  year: 2017,
};
matilda.calcAge = Jonas.calcAge; //copied function from Jonas object
matilda.calcAge();

const f = Jonas.calcAge; //type 'f' on console and see result

Jonas.greet(); // prints 'Hey undefined'
var firstName = 'Matilda';
Jonas.greet(); // prints Hey 'Matilda' > this keyword points to firstName which is a global variable, and hoised since its var

//BEST PRACTICE >>>>>> NEVER USE ARROW FUNCTION AS METHODS. NEVER USER VAR TO CREATE/ASSIGN VARIABLES. ALWAYS HOVER ON 'THIS' KEYWORD TO SEE WHICH OBJECT IT POINTS TO <<<<<<
