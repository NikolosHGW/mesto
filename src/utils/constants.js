export const popupEdt = document.querySelector('.popup_edd');
export const popupAdd = document.querySelector('.popup_add');
export const buttonEdt = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonAvatar = document.querySelector('.profile__avatar-button');
export const formElementEdt = popupEdt.querySelector('.popup__form');
export const formElementAdd = popupAdd.querySelector('.popup__form');
export const nameInput = popupEdt.querySelector('.popup__input_el_name');
export const jobInput = popupEdt.querySelector('.popup__input_el_job');
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
export const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '767d748b-8638-4c15-8660-c2781c344fe7',
    'Content-Type': 'application/json',
  }
};
