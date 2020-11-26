let popup = document.querySelector(".popup");
let eddButton = document.querySelector(".profile__edit-button");
let clsButton = popup.querySelector(".popup__close-icon");
let profile = document.querySelector(".profile");
let formElement = document.querySelector(".popup__form");
let nameInput = popup.querySelector(".popup__edit-name");
let jobInput = popup.querySelector(".popup__edit-job");
let profName = profile.querySelector(".profile__name");
let profJob = profile.querySelector(".profile__job");

//Функция для открытия Popup окна
function opnPopup() {
  popup.classList.add("popup_opened"); //добавляет стиль с display:flex, чтобы перекрыть display:none
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
}

//Функция для закрытия Popup окна
function clsPopup() {
  popup.classList.remove("popup_opened"); // убирает модификатор со стилем display:flex
}

//Функция для отправки данных из инпут полей Popup в profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  clsPopup();
}

eddButton.addEventListener("click", opnPopup);
clsButton.addEventListener("click", clsPopup);
formElement.addEventListener('submit', formSubmitHandler);
