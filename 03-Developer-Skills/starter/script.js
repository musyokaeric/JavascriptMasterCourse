// Remember, we're gonna use strict mode in all scripts now!
'use strict';

//Prettier extension on vscode - prettier.io - opinionated code formatter
//User snippets on vscode - similar to cw / Console.WrieLine on c#
//TODOHighlights - highlights parts of a text like BUG FIXME. all configured in json settings
// "todohighlight.include": [
//     "**/*.js",
//     "**/*.jsx",
//     "**/*.ts",
//     "**/*.tsx",
//     "**/*.html",
//     "**/*.php",
//     "**/*.css",
//     "**/*.scss"
//   ],
//   "todohighlight.keywords": [
//     {
//       "text": "BUG",
//       "color": "#333",
//       "backgroundColor": "red"
//     },
//     {
//       "text": "FIXME",
//       "color": "#333",
//       "backgroundColor": "orange"
//     }
//   ],
//   "todohighlight.isCaseSensitive": true
//Live server - Launch a development local Server with live reload feature for static & dynamic pages. You can install in vscode as an extension or using node.js
//Install Node.js
//Type npm install live-server -g to install live server
//The type live-server to activate

console.log(
  'Calculate the amplitude: difference between max and min of an array'
);
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

function calcTempAmplitude(temp1, temp2) {
  let temps = temp1.concat(temp2);
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') continue;
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
  }
  return max - min;
}
console.log(calcTempAmplitude(temperatures, [-9, 0, 5]));

//Coding challenge #1
//===================

function printForecast(arr) {
  let report = '...';
  for (let i = 0; i < arr.length; i++) {
    report += ` ${arr[i]}℃ in ${i + 1} `;
    if (i + 1 > 1) report += `days ...`;
    else report += `day ...`;
  }
  return report;
}
console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
