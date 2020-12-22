const body = document.querySelector(".body");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupEdt = document.querySelector(".popup_edd");
const popupAdd = document.querySelector(".popup_add");
const popupImg = document.querySelector(".popup_img");
const buttonEdt = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonClsEdt = popupEdt.querySelector(".popup__close-icon");
const buttonClsAdd = popupAdd.querySelector(".popup__close-icon");
const buttonClsImg = popupImg.querySelector(".popup__close-icon");
const profile = document.querySelector(".profile");
const formElement = popupEdt.querySelector(".popup__form");
const formElementAdd = popupAdd.querySelector(".popup__form");
const nameInput = popupEdt.querySelector(".popup__input_el_name");
const jobInput = popupEdt.querySelector(".popup__input_el_job");
const cardNameInput = popupAdd.querySelector(".popup__input_el_card-name");
const imgLinkInput = popupAdd.querySelector(".popup__input_el_img-link");
const profName = profile.querySelector(".profile__name");
const profJob = profile.querySelector(".profile__job");
const bigImg = popupImg.querySelector(".popup-img__img");
const captionBigImg = popupImg.querySelector(".popup-img__caption");
const elementTemplate = document.querySelector("#element-template").content;
const elementsContainer = document.querySelector(".elements");
const forms = document.forms;
const inputsPopupEdt = Array.from(forms.popupForm.querySelectorAll(".popup__input"));
const inputsPopupAdd = Array.from(forms.popupAddForm.querySelectorAll(".popup__input"));
const submitPopupEdt = forms.popupForm.querySelector(".popup__save-button");
const submitPopupAdd = forms.popupAddForm.querySelector(".popup__save-button");
const objValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//Функция для открытия Popup окон
function opnPopup(popup) {
  popup.classList.add("popup_opened"); //добавляет стиль с visibility:visible, чтобы перекрыть visibility:hide
}

//Функция для закрытия Popup окон
function clsPopup(popup) {
  popup.classList.remove("popup_opened"); // убирает модификатор со стилем visibility:visible
}

//Функция для отправки данных из инпут полей Popup в profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  clsPopup(popupEdt);
}

//Функция для создания карточек
function createCard(link, name) {
  const elementItem = elementTemplate.cloneNode(true);
  const imgElement = elementItem.querySelector(".element__img");
  const headingElement = elementItem.querySelector(".element__heading");
  const buttonLike = elementItem.querySelector(".element__like-button");
  const buttonDel = elementItem.querySelector(".element__del-button");
  const buttonImg = elementItem.querySelector(".element__img-button");

  imgElement.src = link;
  imgElement.alt = "Загруженная картинка";
  headingElement.textContent = name;
  buttonLike.addEventListener("click", evt => {
    evt.target.classList.toggle("element__like-button_active");
  });
  buttonDel.addEventListener("click", evt => {evt.target.closest(".element").remove()});
  buttonImg.addEventListener("click", evt => {
    bigImg.src = evt.target.src;
    bigImg.alt = evt.target.alt;
    captionBigImg.textContent = evt.target.parentElement.parentElement.querySelector(".element__heading").textContent;
    addAnyListeners(body, "keydown", closePopupWithEscape);
    opnPopup(popupImg);
  });
  return elementItem;
}

//Функция для добавления карточки в контейнер
function addCard(container, cardElement, append = false) {
  append ? container.append(cardElement) : container.prepend(cardElement);
}

//Функция для добавлении новых карточек
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  addCard(elementsContainer, createCard(imgLinkInput.value, cardNameInput.value));
  clsPopup(popupAdd);
}

//Функция для закрытия попапа при событии keydown равное esc
function closePopupWithEscape(evt) {
  if (evt.key == "Escape") {
    if (body.querySelector(".popup_opened")) {
      body.querySelector(".popup_opened").classList.remove("popup_opened");
      removeAnyListeners(body, "keydown", closePopupWithEscape);
    }
  }
}

//Функция для добавления слушателя на любой элемент
function addAnyListeners(element, eventString, func) {
  element.addEventListener(eventString, func);
}

//Функция для удаления слушателя с любого элемента
function removeAnyListeners(element, eventString, func) {
  element.removeEventListener(eventString, func);
}


buttonEdt.addEventListener("click", () => {
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
  inputsPopupEdt.forEach(inputElement => {
    checkInputValidity(forms.popupForm, inputElement, objValidation.inputErrorClass, objValidation.errorClass);
  })
  toggleButtonState(inputsPopupEdt, submitPopupEdt, objValidation.inactiveButtonClass);
  addAnyListeners(body, "keydown", closePopupWithEscape);
  opnPopup(popupEdt);
});
buttonAdd.addEventListener("click", () => {
  formElementAdd.reset();
  toggleButtonState(inputsPopupAdd, submitPopupAdd, objValidation.inactiveButtonClass);
  addAnyListeners(body, "keydown", closePopupWithEscape);
  opnPopup(popupAdd);
});
buttonClsEdt.addEventListener("click", () => {clsPopup(popupEdt)});
buttonClsAdd.addEventListener("click", () => {
  clsPopup(popupAdd);
  inputsPopupAdd.forEach(inputElement => {
    hideInputError(forms.popupAddForm, inputElement, objValidation.inputErrorClass, objValidation.errorClass);
  });
});
buttonClsImg.addEventListener("click", () => {clsPopup(popupImg)});
formElement.addEventListener("submit", formSubmitHandler);
formElementAdd.addEventListener("submit", formAddSubmitHandler);


//Добавление слушателей на все модальный окна для их закрытия по оверлэю
popups.forEach(popup => {
  popup.addEventListener("click", evt => {
    if (evt.target.classList.contains("popup")) {
      clsPopup(evt.target);
    }
  });
});
//Заполнение карточками страницы при ее загрузке
initialCards.forEach(item => {
  addCard(elementsContainer, createCard(item.link, item.name), true);
});
