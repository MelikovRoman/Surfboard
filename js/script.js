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

///// Выпадающее меню (товар)

const product_button  = document.querySelector('.product__button');
const dropdown_content  = document.querySelector('.dropdown__content');

function dropdown(){
  dropdown_content.classList.toggle('dropdown__content--show');
}

product_button.addEventListener('click' , dropdown);

///// Слайдшоу (отзывы)

const findBlockByAlias = alias => {
  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") == alias
  })
}

$(".interactive-avatar__link").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".interactive-avatar");

  itemToShow.addClass("reviews__item--active").siblings().removeClass("reviews__item--active");
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
})

///// Вертикальный аккардеон (команда)

const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block")
  const reqHeight = textBlock.height()

  container.addClass("active")
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find(".team__content");
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$(".team__button").click (e => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team");
  const elemContainer = $this.closest(".team__item")

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container)
  } else {
    closeEveryItem(container)
    openItem($this)
  }
})

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

///// Форма

const form = document.querySelector(".form");
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup__text");
const closeButton = popup.querySelector(".popup__close")

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = false;

  const fields = [
    form.elements.name,
    form.elements.comment,
    form.elements.phone,
  ];

  const data = {
    name: form.elements.name.value,
    comment: form.elements.comment.value,
    phone: form.elements.phone.value,
    to: "test@mail.ru",
  };

  fields.forEach((field) => {
    if (!field.value.length) {
      field.classList.add("error");
      isValid = false;
    } else {
      field.classList.remove("error");
      isValid = true;
    }
  });

  if (isValid) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST","https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.addEventListener("load", (e) => {
      if (xhr.status >= 400) {
        popup.classList.add("popup--active")
        popupText.innerText = "Что-то пошло не так";
      } else {
        let text = JSON.parse(xhr.responseText).message;
        popup.classList.add("popup--active");
        popupText.innerText = text;
      }
    })
  }
})

popup.addEventListener("click", (e) => {
  const target = e.target;

  if (target === closeButton || target === popup) {
    popup.classList.remove("popup--active");
  }
});
