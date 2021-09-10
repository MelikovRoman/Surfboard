///// Навигация

const hamburger  = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

const links = document.querySelectorAll('.nav__link');

links.forEach(function(element){
  element.addEventListener('click' , preventEvent);
  element.addEventListener('click' , toggleMenu);
})

function preventEvent( event ) {
  event.preventDefault();
}

function toggleMenu(){
  hamburger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
  body.classList.toggle('body--active-menu');
}

hamburger.addEventListener('click' , toggleMenu);
