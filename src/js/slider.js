///// Слайдер (товар)

const leftBtn = document.querySelector(".product-slider__errow-left");
const rightBtn = document.querySelector(".product-slider__errow-right");
const items = document.querySelector(".product__list");
const computedStyle = getComputedStyle(items);
const item = document.querySelectorAll(".products__item");

const minRight = 0;
const itemWidth = getComputedStyle(item[0]).width;
const step = parseInt(itemWidth);
const maxRight = (item.length - 1) * step;
let currentRight = 0;

items.style.right = currentRight;

rightBtn.addEventListener("click", e => {
  e.preventDefault();

  if(currentRight < maxRight) {
    currentRight += step;
    items.style.right = currentRight + "px"
  }
})

leftBtn.addEventListener("click", e => {
  e.preventDefault();

  if(currentRight > minRight) {
    currentRight -= step;
    items.style.right = currentRight + "px"
  }
});
