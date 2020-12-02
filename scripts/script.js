const popup = document.querySelector(".popup");
const eddButton = document.querySelector(".profile__edit-button");
const clsButton = popup.querySelector(".popup__close-icon");
const profile = document.querySelector(".profile");
const formElement = document.querySelector(".popup__form");
const nameInput = popup.querySelector(".popup__input_el_name");
const jobInput = popup.querySelector(".popup__input_el_job");
const profName = profile.querySelector(".profile__name");
const profJob = profile.querySelector(".profile__job");
const elementTemplate = document.querySelector("#element-template").content;
const elementsSection = document.querySelector(".elements");
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

//Заполнение карточек при загрузке страницы
initialCards.forEach(item => {
  const elementItem = elementTemplate.cloneNode(true);
  elementItem.querySelector(".element__img").src = item.link;
  elementItem.querySelector(".element__heading").textContent = item.name;
  elementsSection.append(elementItem);
});


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
