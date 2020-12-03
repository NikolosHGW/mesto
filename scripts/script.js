const popupEdd = document.querySelector(".popup_edd");
const popupAdd = document.querySelector(".popup_add");
const eddButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const clsButtonEdd = popupEdd.querySelector(".popup__close-icon");
const clsButtonAdd = popupAdd.querySelector(".popup__close-icon");
const profile = document.querySelector(".profile");
const formElement = popupEdd.querySelector(".popup__form");
const formElementAdd = popupAdd.querySelector(".popup__form");
const nameInput = popupEdd.querySelector(".popup__input_el_name");
const jobInput = popupEdd.querySelector(".popup__input_el_job");
const cardNameInput = popupAdd.querySelector(".popup__input_el_card-name");
const imgLinkInput = popupAdd.querySelector(".popup__input_el_img-link");
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
  elementItem.querySelector(".element__like-button").addEventListener("click", evt => {
    evt.target.classList.toggle("element__like-button_active");
  });
  elementsSection.append(elementItem);
});


//Функция для открытия Popup окна редактирования
function opnEddPopup() {
  popupEdd.classList.add("popup_opened"); //добавляет стиль с display:flex, чтобы перекрыть display:none
  nameInput.value = profName.textContent;
  jobInput.value = profJob.textContent;
}

//Функция для открытия Popup окна добавления
function opnAddPopup() {
  popupAdd.classList.add("popup_opened"); //добавляет стиль с display:flex, чтобы перекрыть display:none
  cardNameInput.value = null;
  imgLinkInput.value = null;
}

//Функция для закрытия Popup окон
function clsPopup() {
  popupEdd.classList.remove("popup_opened"); // убирает модификатор со стилем display:flex
  popupAdd.classList.remove("popup_opened");
}

//Функция для отправки данных из инпут полей Popup в profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  clsPopup();
}

//Функция создания карточек
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  const newElementItem = elementTemplate.cloneNode(true);
  newElementItem.querySelector(".element__heading").textContent = cardNameInput.value;
  newElementItem.querySelector(".element__img").src = imgLinkInput.value;
  newElementItem.querySelector(".element__like-button").addEventListener("click", evt => {
    evt.target.classList.toggle("element__like-button_active");
  });
  elementsSection.prepend(newElementItem);
  clsPopup();
}


eddButton.addEventListener("click", opnEddPopup);
addButton.addEventListener("click", opnAddPopup);
clsButtonEdd.addEventListener("click", clsPopup);
clsButtonAdd.addEventListener("click", clsPopup);
formElement.addEventListener("submit", formSubmitHandler);
formElementAdd.addEventListener("submit", formAddSubmitHandler);
