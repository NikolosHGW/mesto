import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";
import {
  buttonEdt, buttonAdd,
  formElementEdt, formElementAdd, nameInput, jobInput,
  config, initialCards
} from '../utils/constants.js';


const formEdtValid = new FormValidator(config, formElementEdt);
const formAddValid = new FormValidator(config, formElementAdd);

const popupImage = new PopupWithImage('.popup_img');

const elementsSection = new Section( { items: initialCards, renderer: item => {
  const card = new Card(item, '.elements__template', (link, nameCard) => {
    popupImage.open(link, nameCard);
  });
  elementsSection.addItem(card.generateCard());
}}, '.elements' );

const userInfo = new UserInfo( { name: '.profile__name', job: '.profile__job' } );

const popupEdit = new PopupWithForm('.popup_edd', item => {
  userInfo.setUserInfo(item);
  popupEdit.close();
});

const popupAdd = new PopupWithForm('.popup_add', item => {
  const card = new Card(item, '.elements__template', (link, nameCard) => {
    popupImage.open(link, nameCard);
  });
  elementsSection.addItem(card.generateCard());
  popupAdd.close();
});


buttonEdt.addEventListener('click', () => {
  popupEdit.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  formEdtValid.resetValidation();
});
buttonAdd.addEventListener('click', () => {
  formAddValid.resetValidation();
  popupAdd.open();
});
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
elementsSection.renderItems();
formEdtValid.enableValidation();
formAddValid.enableValidation();
