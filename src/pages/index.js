import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";
import {
  body, popups, popupEdt, popupAdd, popupImg, buttonEdt, buttonAdd,
  formElementEdt, formElementAdd, nameInput, jobInput, cardNameInput,
  imgLinkInput, profName, profJob, bigImg, captionBigImg, elementsContainer, config,
  initialCards
} from '../utils/constants.js';


const elementsSection = new Section( { items: initialCards, renderer: item => {
  const card = new Card(item, '.elements__template', (link, nameCard) => {
    const popupImage = new PopupWithImage('.popup_img', body, { link: link, nameCard: nameCard });
    popupImage.setEventListeners();
    popupImage.open(bigImg, captionBigImg);
  });
  elementsSection.addItem(card.generateCard());
}}, '.elements' );

const userInfo = new UserInfo( { name: '.profile__name', job: '.profile__job' } );

const popupEdit = new PopupWithForm('.popup_edd', body, item => {
  userInfo.setUserInfo(item);
  popupEdit.close();
});


popupEdit.setEventListeners();
buttonEdt.addEventListener('click', () => {
  popupEdit.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
})
elementsSection.renderItems();

















// const formEdtValid = new FormValidator(config, formElementEdt);
// const formAddValid = new FormValidator(config, formElementAdd);


// //Функция для открытия Popup окон
// function openPopup(popup) {
//   popup.classList.add("popup_opened"); //добавляет стиль с visibility:visible, чтобы перекрыть visibility:hide
//   addAnyListeners(body, "keydown", closePopupWithEscape);
// }

// //Функция для закрытия Popup окон
// function closePopup(popup) {
//   popup.classList.remove("popup_opened"); // убирает модификатор со стилем visibility:visible
//   removeAnyListeners(body, "keydown", closePopupWithEscape);
// }

// //Функция для отправки данных из инпут полей PopupEdt в profile
// function formSubmitHandler(evt) {
//   evt.preventDefault(); // сбрасывает стандартную отправку формы

//   profName.textContent = nameInput.value;
//   profJob.textContent = jobInput.value;
//   closePopup(popupEdt);
// }

// //Функция для добавления карточки в контейнер
// function addCard(container, cardElement, append = false) {
//   append ? container.append(cardElement) : container.prepend(cardElement);
// }

// function creatCard(data, templateSelector = ".elements__template") {
//   const card = new Card(data, templateSelector, openPopupImg);
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// //Функция для добавлении новых карточек
// function formAddSubmitHandler(evt) {
//   evt.preventDefault(); // сбрасывает стандартную отправку формы

//   addCard(elementsContainer, creatCard({ name: cardNameInput.value, link: imgLinkInput.value }));
//   closePopup(popupAdd);
// }

// //Функция для закрытия попапа при событии keydown равное esc
// function closePopupWithEscape(evt) {
//   if (evt.key == "Escape") {
//     const openedPopup = document.querySelector('.popup_opened')
//     if (openedPopup) {
//       closePopup(openedPopup);
//     }
//   }
// }

// //Функция для добавления слушателя на любой элемент
// function addAnyListeners(element, eventString, func) {
//   element.addEventListener(eventString, func);
// }

// //Функция для удаления слушателя с любого элемента
// function removeAnyListeners(element, eventString, func) {
//   element.removeEventListener(eventString, func);
// }

// function openPopupImg(link, name) {
//   bigImg.src = link;
//   bigImg.alt = name;
//   captionBigImg.textContent = name;
//   openPopup(popupImg);
// }


// buttonEdt.addEventListener("click", () => {
//   nameInput.value = profName.textContent;
//   jobInput.value = profJob.textContent;
//   formEdtValid.resetValidation();
//   openPopup(popupEdt);
// });
// buttonAdd.addEventListener("click", () => {
//   formElementAdd.reset();
//   formAddValid.resetValidation();
//   openPopup(popupAdd);
// });
// formElementEdt.addEventListener("submit", formSubmitHandler);
// formElementAdd.addEventListener("submit", formAddSubmitHandler);


// formEdtValid.enableValidation();
// formAddValid.enableValidation();

// //Добавление слушателей на все модальный окна для их закрытия по оверлэю
// popups.forEach(popup => {
//   popup.addEventListener("click", evt => {
//     if (evt.target.classList.contains("popup")) {
//       closePopup(evt.target);
//     }
//     if (evt.target.classList.contains("popup__close-icon")) {
//       closePopup(popup);
//     }
//   });
// });

// //Заполнение карточками страницы при ее загрузке
// initialCards.forEach(item => {
//   addCard(elementsContainer, creatCard(item), true);
// });
