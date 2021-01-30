export const body = document.querySelector(".body");
export const popups = Array.from(document.querySelectorAll(".popup"));
export const popupEdt = document.querySelector(".popup_edd");
export const popupAdd = document.querySelector(".popup_add");
export const popupImg = document.querySelector(".popup_img");
export const buttonEdt = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const profile = document.querySelector(".profile");
export const formElementEdt = popupEdt.querySelector(".popup__form");
export const formElementAdd = popupAdd.querySelector(".popup__form");
export const nameInput = popupEdt.querySelector(".popup__input_el_name");
export const jobInput = popupEdt.querySelector(".popup__input_el_job");
export const cardNameInput = popupAdd.querySelector(".popup__input_el_card-name");
export const imgLinkInput = popupAdd.querySelector(".popup__input_el_img-link");
export const profName = profile.querySelector(".profile__name");
export const profJob = profile.querySelector(".profile__job");
export const bigImg = popupImg.querySelector(".popup-img__img");
export const captionBigImg = popupImg.querySelector(".popup-img__caption");
export const elementsContainer = document.querySelector(".elements");
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};
export const initialCards = [
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
