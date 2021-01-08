import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const body = document.querySelector(".body");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupEdt = document.querySelector(".popup_edd");
const popupAdd = document.querySelector(".popup_add");
const popupImg = document.querySelector(".popup_img");
const buttonEdt = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profile = document.querySelector(".profile");
const formElementEdt = popupEdt.querySelector(".popup__form");
const formElementAdd = popupAdd.querySelector(".popup__form");
const nameInput = popupEdt.querySelector(".popup__input_el_name");
const jobInput = popupEdt.querySelector(".popup__input_el_job");
const cardNameInput = popupAdd.querySelector(".popup__input_el_card-name");
const imgLinkInput = popupAdd.querySelector(".popup__input_el_img-link");
const profName = profile.querySelector(".profile__name");
const profJob = profile.querySelector(".profile__job");
const bigImg = popupImg.querySelector(".popup-img__img");
const captionBigImg = popupImg.querySelector(".popup-img__caption");
const elementsContainer = document.querySelector(".elements");
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};
const formEdtValid = new FormValidator(config, formElementEdt);
const formAddValid = new FormValidator(config, formElementAdd);
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
function openPopup(popup) {
  popup.classList.add("popup_opened"); //добавляет стиль с visibility:visible, чтобы перекрыть visibility:hide
  addAnyListeners(body, "keydown", closePopupWithEscape);
}

//Функция для закрытия Popup окон
function closePopup(popup) {
  popup.classList.remove("popup_opened"); // убирает модификатор со стилем visibility:visible
  removeAnyListeners(body, "keydown", closePopupWithEscape);
}

//Функция для отправки данных из инпут полей PopupEdt в profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  closePopup(popupEdt);
}

//Функция для добавления карточки в контейнер
function addCard(container, cardElement, append = false) {
  append ? container.append(cardElement) : container.prepend(cardElement);
}

function creatCard(data, templateSelector = ".elements__template") {
  const card = new Card(data, templateSelector, openPopupImg);
  const cardElement = card.generateCard();
  return cardElement;
}

//Функция для добавлении новых карточек
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  addCard(elementsContainer, creatCard({ name: cardNameInput.value, link: imgLinkInput.value }));
  closePopup(popupAdd);
}

//Функция для закрытия попапа при событии keydown равное esc
function closePopupWithEscape(evt) {
  if (evt.key == "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    if (openedPopup) {
      closePopup(openedPopup);
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

function openPopupImg(link, name) {
  bigImg.src = link;
  bigImg.alt = name;
  captionBigImg.textContent = name;
  openPopup(popupImg);
}


buttonEdt.addEventListener("click", () => {
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
  formEdtValid.resetValidation();
  openPopup(popupEdt);
});
buttonAdd.addEventListener("click", () => {
  formElementAdd.reset();
  formAddValid.resetValidation();
  openPopup(popupAdd);
});
formElementEdt.addEventListener("submit", formSubmitHandler);
formElementAdd.addEventListener("submit", formAddSubmitHandler);


formEdtValid.enableValidation();
formAddValid.enableValidation();

//Добавление слушателей на все модальный окна для их закрытия по оверлэю
popups.forEach(popup => {
  popup.addEventListener("click", evt => {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    }
    if (evt.target.classList.contains("popup__close-icon")) {
      closePopup(popup);
    }
  });
});

//Заполнение карточками страницы при ее загрузке
initialCards.forEach(item => {
  addCard(elementsContainer, creatCard(item), true);
});
