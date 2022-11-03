//REVIEW: DOM TRAVERSING - 193,194

'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to'); //'learn more' button
const section1 = document.querySelector('#section--1'); //'features' section

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content'); //tab containes

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Implementing smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Implementing page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); ===============> for each .nav__link element

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching target for targeting the navigation links
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
}); //================> uses event propagation/capturing. start with the element containing the children you're working on

///////////////////////////////////////
// Tabbed components

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  //guard clause
  if (!clicked) return;

  //active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active')); //removes all
  clicked.classList.add('operations__tab--active'); //adds active

  //activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active')); //removes all
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
}); //adds active

///////////////////////////////////////
// Menu fade navigation

const handleHover = function (e, opacity) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

//OR (use bind method to attach one method to another)
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1)); //passing argument to handler

///////////////////////////////////////
// Implementing a sticky navigation

// const initialCoordinates = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//OR (use IntersectionObserver API)
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Revealing sections on scrolling

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //section 15% visible
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Building the slider components

let currentSlide = 0;

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));

//functions
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};
goToSlide(0);

const prevSlide = function () {
  if (currentSlide === 0) currentSlide = slides.length - 1;
  else currentSlide--;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const nextSlide = function () {
  if (currentSlide === slides.length - 1) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

//next slide
btnRight.addEventListener('click', nextSlide);

//previous slide
btnLeft.addEventListener('click', prevSlide);

//move slider using left and right key
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  else if (e.key === 'ArrowRight') nextSlide();
});

//dots below the slider
dotContainer.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

//DOM event lifecycle
document.addEventListener('DOMContentLoaded', function (e) {
  e.preventDefault();
  console.log('HTML Parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  e.preventDefault();
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   // this.alert('Are you sure you want to exit?');
//   e.returnValue = 'message';
// });
