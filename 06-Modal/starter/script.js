'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal'); //selects all elements with the same class
console.log(btnsOpenModal);

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//removes class name 'hidden' included together with the overlay class. check html elements. similar to 'overlay.style.display = 'block'', but more efficient (DRY principle)

//displaying modal window
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

//enable close button on modal window
btnCloseModal.addEventListener('click', closeModal);
//click outside area of the modal window
overlay.addEventListener('click', closeModal);

//handling global or keyboard events (ESC. key)
//keydown - press key
//keypress - press and hold
//keyup - lift finger from key

//document.addEventListener('keydown', closeModal); - runs after pressing any key

document.addEventListener('keydown', function (e) {
  console.log(e); //check console to see arguments passed
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) closeModal();
  }
});
