const popupEdt = document.querySelector(".popup_edd");
const popupAdd = document.querySelector(".popup_add");
const popupImg = document.querySelector(".popup-img");
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


//Функция для открытия Popup окна редактирования
function opnEddPopup() {
  popupEdt.classList.add("popup_opened"); //добавляет стиль с display:flex, чтобы перекрыть display:none
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
  popupEdt.classList.remove("popup_opened"); // убирает модификатор со стилем display:flex
  popupAdd.classList.remove("popup_opened");
  popupImg.classList.remove("popup-img_opened");
}

//Функция для отправки данных из инпут полей Popup в profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;
  clsPopup();
}

//Функция для удаления карточек
function deleteCard(evt) {
  evt.target.closest(".element").remove();
}

//Функция для открытия картинки на 75% размера экрана
function viewImg(evt) {
  bigImg.src = evt.target.src;
  captionBigImg.textContent = evt.target.parentElement.parentElement.querySelector(".element__heading").textContent;
  popupImg.classList.add("popup-img_opened");
}

//Функция для генерации карточек
function generateCards(valImg, valHeading, append = false) {
  const elementItem = elementTemplate.cloneNode(true);
  elementItem.querySelector(".element__img").src = valImg;
  elementItem.querySelector(".element__heading").textContent = valHeading;
  elementItem.querySelector(".element__like-button").addEventListener("click", evt => {
    evt.target.classList.toggle("element__like-button_active");
  });
  elementItem.querySelector(".element__del-button").addEventListener("click", deleteCard);
  elementItem.querySelector(".element__img-button").addEventListener("click", viewImg);
  append ? elementsSection.append(elementItem) : elementsSection.prepend(elementItem);
}

//Заполнение карточками страницы при ее загрузке
initialCards.forEach(item => {
  generateCards(item.link, item.name, true);
});

//Функция для добавлении новых карточек
function formAddSubmitHandler(evt) {
  evt.preventDefault(); // сбрасывает стандартную отправку формы

  generateCards(imgLinkInput.value, cardNameInput.value);
  clsPopup();
}


buttonEdt.addEventListener("click", opnEddPopup);
buttonAdd.addEventListener("click", opnAddPopup);
buttonClsEdt.addEventListener("click", clsPopup);
buttonClsAdd.addEventListener("click", clsPopup);
buttonClsImg.addEventListener("click", clsPopup);
formElement.addEventListener("submit", formSubmitHandler);
formElementAdd.addEventListener("submit", formAddSubmitHandler);
