//Importing module
import {
  addToCart,
  shippingCost,
  totalPrice as price,
  totalQuantity,
} from './shoppingCart.js';

//importing everything into an object
import * as ShoppingCart from './shoppingCart.js';

console.log('Importing module');
console.log(shippingCost, price, totalQuantity);

addToCart('bread', 5);
ShoppingCart.addToCart('milk', 10);

//Importing the default exports
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
console.log(cart); // modules are live links, not copies
console.log('\n\n');

//top level await
console.log('Start fetching');
const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  //console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost(); //execution continues even before block of code is finished
console.log(lastPost);

//const lastPostAsync = await getLastPost(); //will not work after imporint parcel
const lastPostAsync = getLastPost(); //execution does not continue until block of code is finished
console.log(lastPostAsync);
console.log('Finished fetching');
console.log('\n\n');

//module patterns
const ShoppingCart2 = (function () {
  const cart = [];
  let shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  const changeCost = function () {
    shippingCost += 10;
    console.log(shippingCost);
  };

  return {
    addToCart,
    changeCost,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('applie', 4);
ShoppingCart2.addToCart('pizza', 2);

console.log(ShoppingCart2.cart);
console.log(ShoppingCart2.shippingCost);
ShoppingCart2.changeCost();
ShoppingCart2.changeCost();
ShoppingCart2.changeCost();
console.log('\n\n');

//importing from lodash, installed and copied using npm
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;

console.log(state);
console.log(stateClone);
console.log(stateDeepClone);

// if (module.hot) {
//   module.hot.accept();
// }

class Person {
  #greeting = 'Hey';

  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve('TEST').then(x => console.log(x));

//polifilling functions
// import './node_modules/core-js/stable';

//polifilling async functions
// import 'regenerator-runtime/runtime';
