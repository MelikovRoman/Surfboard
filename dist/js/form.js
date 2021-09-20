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
        form.reset();
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
