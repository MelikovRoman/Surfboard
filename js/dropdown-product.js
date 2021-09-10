///// Выпадающее меню (товар)

const product_button  = document.querySelector('.product__button');
const dropdown_content  = document.querySelector('.dropdown__content');

function dropdown(){
  dropdown_content.classList.toggle('dropdown__content--show');
}

product_button.addEventListener('click' , dropdown);
