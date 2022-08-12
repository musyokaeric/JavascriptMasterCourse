//coding challenge #1
//===================
let markMass = 78;
let markHeight = 1.69;
let johnMass = 92;
let johnHeight = 1.95;

let markBMI = markMass / markHeight ** 2;
let johnBMI = johnMass / johnHeight ** 2;

let markHigherBMI = markBMI > johnBMI;
console.log(markBMI, johnBMI, markHigherBMI);

//coding challenge #2
//===================
if (markHigherBMI) {
    console.log(`Mark's BMI(${markBMI}) is higher than John's (${johnBMI})`);
} else {
    console.log(`John's BMI(${johnBMI}) is higher than Mark's (${markBMI})`);
}

//coding challenge #3
//===================
dolphinAverage = (96 + 108 + 89) / 3;
koalaAverage = (88 + 91 + 110) / 3;
console.log(dolphinAverage, koalaAverage);

if (dolphinAverage > koalaAverage && dolphinAverage >= 100) {
    console.log("Dolphins win!");
} else if (dolphinAverage < koalaAverage && koalaAverage >= 100) {
    console.log("Koalas win!");
} else if ( dolphinAverage === koalaAverage && dolphinAverage >= 100 && koalaAverage >= 100) {
    console.log("It's a draw!");
} else {
    console.log("No one wins!");
}

//coding challenge #4
//===================
let bill = 40;
let rate = (bill >= 50 && bill <= 300) ? .15 : .2;
let tip = bill >= 50 ? bill * rate : 0;
console.log(`Bill: ${bill}`);
console.log(`Tip: ${tip}`);
console.log(`Total: ${bill + tip}`);