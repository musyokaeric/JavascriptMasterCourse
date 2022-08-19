//activates strict mode - used to write secure js code
//and creates visible errors in the developer console
'use strict';

function calcAge1(birthYear) { //function declaration
    return 2037 - birthYear;
}
const age1 = calcAge1(1991);

const calcAge2 = function (birthYear) { //function expression
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);

const calcAge3 = birthYear => 2037 - birthYear; //arrow function
const age3 = calcAge3(1991);

console.log(age1, age2, age3);

//coding challenge #1
//===================
let calcAverage = (num1, num2, num3) => (num1 + num2 + num3) / 3;
let avgDolphins = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);
function checkWinner(dolphins, koalas) {
    if (dolphins >= koalas * 2) console.log(`Dolphins win (${dolphins} vs. ${koalas})`);
    else if (koalas >= dolphins * 2) console.log(`Koalas win (${koalas} vs. ${dolphins})`);
    else return console.log(`No team wins!`);
}
checkWinner(avgDolphins, avgKoalas);
checkWinner(576, 111);

//array methods
//1. push/pop - at the end of the array
//2. unshift/shift - at the beginning of the array
//3. includes - same as "contains"

//coding challenge #2
//===================
const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
let bills = [125, 555, 44];
let tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
let total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(bills, tips, total);

//coding challenge #3
//===================
const mark = {
    name: 'Mark Miller',
    weight: 78,
    height: 1.69,

    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
    }
};
const john = {
    name: 'John Smith',
    weight: 92,
    height: 1.95,

    calcBMI: function () {
        this.bmi = this.weight / this.height ** 2;
    }
};
if (john.calcBMI() > mark.calcBMI()) console.log(`${john.name}'s BMI (${john['bmi']}) is higher than ${mark.name}'s (${mark.bmi})!`);
else console.log(`${mark.name}'s BMI (${mark['bmi']}) is higher than ${john.name}'s (${john.bmi})!`);

//coding challenge #4
//===================
bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
tips = [];
total = [];

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    total.push(bills[i] + tips[i]);
}
console.log(bills, tips, total);
calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
console.log(calcAverage(bills));