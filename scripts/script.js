const popupEdt = document.querySelector(".popup_edd");
const popupAdd = document.querySelector(".popup_add");
const popupImg = document.querySelector(".popup_img");
const buttonEdt = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonClsEdt = popupEdt.querySelector(".popup__close-icon");
const buttonClsAdd = popupAdd.querySelector(".popup__close-icon");
const buttonClsImg = popupImg.querySelector(".popup-img__close-icon");
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
const formList = Array.from(document.querySelectorAll(".popup__form"));
const inputsPopupEdt = Array.from(document.forms.popupForm.querySelectorAll(".popup__input"));
const submitPopupEdt = document.forms.popupForm.querySelector(".popup__save-button");
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
    opnPopup(popupImg);
  });
  return elementItem;
}

//Функция для добавления карточки в контейнер
function addCard(container, cardElement, append = false) {
  append ? container.append(cardElement) : container.prepend(cardElement);
}

//Заполнение карточками страницы при ее загрузке
initialCards.forEach(item => {
  addCard(elementsContainer, createCard(item.link, item.name), true);
});

//Функция для добавлении новых карточек
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  addCard(elementsContainer, createCard(imgLinkInput.value, cardNameInput.value));
  clsPopup(popupAdd);
}

//Функция показывает span с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

//Функция скрывает span с ошибкой
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

//Функция управляет видимостью span-ошибки в зависимости от свойства valid у input полей
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  }
}

//Функция ищет невалидное свойство в объекте validity в списке инпутов
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

//Функция меняет активность кнопки в зависимости от валидности свойств в объекте validity
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_inactive");
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove("popup__save-button_inactive");
    buttonElement.removeAttribute('disabled');
  }
}

//Функция вешает на инпуты(поля) определенной формы слушатель события 'input'
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__save-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

//Функция выявляет все формы на странице, сбрасывает им дефолтное поведение и передает каждую форму в setEventListeners
function enableValidation() {
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
enableValidation();


buttonEdt.addEventListener("click", () => {
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
  toggleButtonState(inputsPopupEdt, submitPopupEdt);
  opnPopup(popupEdt);
});
buttonAdd.addEventListener("click", () => {
  formElementAdd.reset();
  opnPopup(popupAdd)
});
buttonClsEdt.addEventListener("click", () => {clsPopup(popupEdt)});
buttonClsAdd.addEventListener("click", () => {clsPopup(popupAdd)});
buttonClsImg.addEventListener("click", () => {clsPopup(popupImg)});
formElement.addEventListener("submit", formSubmitHandler);
formElementAdd.addEventListener("submit", formAddSubmitHandler);
