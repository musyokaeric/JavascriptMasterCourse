'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${[
            ...Object.values(data.languages),
          ].join(', ')}</p>
          <p class="country__row"><span>💰</span>${
            [...Object.values(data.currencies)][0].name
          }</p>
      </div>
      </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentText('beforeend', msg);
};

///////////////////////////////////////
// AJAX -> XMLTTPREQUEST FUNCTION

const getCountryandNeighbor = function (country) {
  //ajax call 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function (e) {
    e.preventDefault();
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    console.log(data.currencies);
    console.log([...Object.values(data.currencies)][0].name);

    renderCountry(data);

    //get neighboring country 2
    const [neighbor] = data.borders;
    if (!neighbor) return;

    //ajax call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    // callback hell -> nested callback funtions
    request2.addEventListener('load', function (e) {
      e.preventDefault();
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

//getCountryandNeighbor('kenya');

///////////////////////////////////////////
// ALTERNATIVE TO AJAX - FETCH AND PROMISES

const getJSON = (url, errMsg = 'Something went wrong') =>
  fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg}. (${response.status}).`);

    return response.json();
  });
const getCountryData = function (country) {
  //country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if (!neighbor) console.log('No neighbor found!');

      //country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥`);
      renderError(`Something went wrong: ${err} 💥💥. Try again!`);
    }) //handles the error
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function (e) {
//   e.preventDefault();
//   getCountryData('australia');
// });

/**
 * *****************
 * CHALLENGE CODE #1
 * *****************
 */

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(
        `You are in ${data.standard.city},${data.standard.countryname}`
      );
      return fetch(
        `https://restcountries.com/v3.1/name/${data.standard.countrname}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(`${err.message} 💥`));
};

// setTimeout(() => {
//   whereAmI(52.5, 13.3);
// }, 10000);

///////////////////////////////////////
// EVENT LOOP ORDER

const eventOrderLoop = function () {
  console.log(`Test start`);
  setTimeout(() => {
    console.log(`0 sec timer`);
  }, 0);
  Promise.resolve('Resolved promise 1').then(res => console.log(res));

  Promise.resolve('Resolved promise 2').then(res => {
    for (let i = 0; i < 1000000000; i++) {}
    console.log(res);
  });

  console.log(`Test end`);
};

//eventOrderLoop();

//ORDER
// - code outside the callback fuctions are executed first
// - promises run second because they are in microtasks, which are given a higher priority then the callback functions
// - lastly the callbacl functions will run

///////////////////////////////////////
// PROMISES

// const lotteryPromise = new Promise((resolve, reject) => {
//   console.log(`Lottery draw is happening 🔮`);
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You LOSE 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.info(res)).catch(err => console.error(err));

// PROMISIFYING
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(1)
//   .then(() => {
//     console.log(`I waited for 1 second`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`I waited for 2 seconds`);
//     return wait(1);
//   })
//   .then(() => console.log(`I waited for 3 seconds`));

//PROMISIFYING THE GEOLOCATION API

// console.log(`Getting position`);
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   pos => resolve(pos),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//getPosition().then(pos => console.log(pos));

const whereAmIPromisifying = function () {
  getPosition().then(pos => {
    const { latitude, longitude } = pos.coords;
    console.log(latitude, longitude);
  });
};

//btn.addEventListener('click', whereAmIPromisifying);

/**
 * *****************
 * CHALLENGE CODE #2
 * *****************
 */

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function (e) {
      e.preventDefault();
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function (e) {
      e.preventDefault();
      reject(new Error('Image not found'));
    });
  });
};

// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     currentImg.style.display = 'inline-block';
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     currentImg.style.display = 'inline-block';
//     console.log('Image 3 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-4.jpg');
//   })
//   .catch(err => console.error(err));

///////////////////////////////////////
// ASYNC / AWAIT

const getPositions = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmIAsync = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    //console.log(data);
    renderCountry(data[0]);

    return `You are in ${data[0].capital}, ${country}`;
  } catch (err) {
    renderError(err.message);
    console.error(err);

    //reject promise returned from async function
    throw err;
  }
};

//console.log('1. will get location');

// whereAmIAsync('Kenyca')
//   .then(city => console.log(`2. ${city}`))
//   .catch(err => console.log(`2. ${err.message}`))
//   .finally(() => console.log('3. finished getting location'));

//using iffy

// (async function () {
//   try {
//     const city = await whereAmIAsync('Kenya');
//     console.log(`2. ${city}`);
//   } catch (err) {
//     console.log(`2. ${err.message}`);
//   } finally {
//     console.log('3. finished getting location\n\n');
//   }
// })();

const get3countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    //running promises in parallel
    const data = Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    // console.log([data1.capital, data2.capital, data3.capital]);
    console.log((await data).map(d => d[0].capital));
  } catch (err) {}
};

//get3countries('portugal', 'kenya', 'seychelles');

//race - returns the first promise that loads the fastest
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/new zealand`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    getJSON(`https://restcountries.com/v3.1/name/japan`),
  ]);
  console.log(res);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/mexico`),
  getJSON(`https://restcountries.com/v3.1/name/japan`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

//Promise.allSettled - returns all promises even if rejected

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('AnotherSuccess'),
// ]).then(res => console.log(res));

//Promise.any - returns the first fulfilled/resolved promise
Promise.any([
  //Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('AnotherSuccess'),
  Promise.resolve('Third success'),
]).then(res => console.log(res));

/**
 * *****************
 * CHALLENGE CODE #3
 * *****************
 */

// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     currentImg.style.display = 'inline-block';
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     currentImg.style.display = 'inline-block';
//     console.log('Image 3 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-4.jpg');
//   })
//   .catch(err => console.error(err));

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

//loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgEl = await Promise.all(imgs);
    console.log(imgEl);

    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
