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

const product_button  = document.querySelector('.product__button');
const dropdown_content  = document.querySelector('.dropdown__content');

function dropdown(){
  dropdown_content.classList.toggle('dropdown__content--show');
}

product_button.addEventListener('click' , dropdown);
