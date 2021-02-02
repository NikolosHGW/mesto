import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";
import {
  body, buttonEdt, buttonAdd,
  formElementEdt, formElementAdd, nameInput, jobInput,
  bigImg, captionBigImg, config, initialCards
} from '../utils/constants.js';


const formEdtValid = new FormValidator(config, formElementEdt);
const formAddValid = new FormValidator(config, formElementAdd);

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

const popupAdd = new PopupWithForm('.popup_add', body, item => {
  const card = new Card(item, '.elements__template', (link, nameCard) => {
    const popupImage = new PopupWithImage('.popup_img', body, { link, nameCard });
    popupImage.setEventListeners();
    popupImage.open(bigImg, captionBigImg);
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
popupEdit.setEventListeners();
popupAdd.setEventListeners();
elementsSection.renderItems();
formEdtValid.enableValidation();
formAddValid.enableValidation();
