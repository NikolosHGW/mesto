import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  buttonEdt, buttonAdd, options,
  formElementEdt, formElementAdd, nameInput, jobInput,
  config, avatar
} from '../utils/constants.js';


const formEdtValid = new FormValidator(config, formElementEdt);
const formAddValid = new FormValidator(config, formElementAdd);

const api = new Api(options);

const popupImage = new PopupWithImage('.popup_img');

const elementsSection = new Section( {}, '.elements' );

const userInfo = new UserInfo( { name: '.profile__name', job: '.profile__job' } );

const popupEdit = new PopupWithForm('.popup_edd', item => {
  userInfo.setUserInfo(item);
  api.setInfoUser(userInfo.getUserInfo())
    .catch(err => console.log(`Ошибка: ${err}`));
  popupEdit.close();
});

const popupAdd = new PopupWithForm('.popup_add', item => {
  api.createCard(item)
    .then(res => {
      const card = new Card({
        data: res,
        handleCardClick: (link, nameCard) => {
          popupImage.open(link, nameCard);
        }
      }, '.elements__template');
      elementsSection.addItem(card.generateCard());
      popupAdd.close();
    })
    .catch(err => console.log(err));
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
formEdtValid.enableValidation();
formAddValid.enableValidation();
api.getInfoUser()
  .then(info => {
    userInfo.setUserInfo({name: info.name, job: info.about});
    avatar.src = info.avatar;
  })
  .catch(err => console.log(err));
api.getInitialCard()
  .then(items => {
    items.forEach(item => {
      const card = new Card({
        data: item,
        handleCardClick: (link, nameCard) => {
          popupImage.open(link, nameCard);
        }
      }, '.elements__template');
      elementsSection.addItem(card.generateCard());
    });
  })
  .catch(err => console.log(err));
