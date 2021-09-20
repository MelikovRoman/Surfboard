///// Выпадающее меню (товар)

const product_button  = document.querySelectorAll('.product__button');
const dropdown_content  = document.querySelector('.dropdown__content');
const dropdown_content_two  = document.querySelector('.dropdown__content-second');

function dropdown(){
  dropdown_content.classList.toggle('dropdown__content--show');
  dropdown_content_two.classList.toggle('dropdown__content-second--show');
}

product_button.forEach(function(element){
  element.addEventListener('click' , dropdown);
})

