import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  buttonEdt, buttonAdd, options,
  formElementEdt, formElementAdd, nameInput, jobInput,
  config, buttonAvatar
} from '../utils/constants.js';


let userStorage = null;


const formEdtValid = new FormValidator(config, formElementEdt);
const formAddValid = new FormValidator(config, formElementAdd);

const api = new Api(options);

const popupImage = new PopupWithImage('.popup_img');

const popupDelete = new PopupWithSubmit('.popup_del', { });

const elementsSection = new Section( {}, '.elements' );

const userInfo = new UserInfo( { name: '.profile__name', job: '.profile__job', avatar: '.profile__avatar' } );

const popupAvatar = new PopupWithForm('.popup_refresh', obj => {
  popupAvatar.loadText();
  api.changeAvatar(obj.link)
    .then(res => {
      popupAvatar.close();
      userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar })
      popupAvatar.loadText();
    })
    .catch(err => console.log(err));
});

const popupEdit = new PopupWithForm('.popup_edd', item => {
  popupEdit.loadText();
  api.setInfoUser(item.name, item.job)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar });
      popupEdit.close();
      popupEdit.loadText();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
});

const popupAdd = new PopupWithForm('.popup_add', item => {
  popupAdd.loadText();
  api.createCard(item)
    .then(res => {
      elementsSection.addItem(createCard(res).generateCard());
      popupAdd.close();
      popupAdd.loadText();
    })
    .catch(err => console.log(err));
});


function createCard(res) {
  const card = new Card({
    data: res,
    handleCardClick: (link, nameCard) => {
      popupImage.open(link, nameCard);
    },
    handleCardDelete: (func, clickEvt) => {
      popupDelete.open(() => {
        api.deleteCard(res._id)
          .then(() => {
            func(clickEvt);
            popupDelete.close();
          })
          .catch(err => console.log(err));
      });
    },
    handleLikes: (toggleFunc, setLikeFunc, clickEvt) => {
      if (clickEvt.target.classList.contains('element__like-button_active')) {
        api.deleteLike(res._id)
          .then(res => {
            toggleFunc(clickEvt);
            setLikeFunc(res.likes.length);
          })
          .catch(err => console.log(err));
      }
      else {
        api.putLike(res._id)
          .then(res => {
            toggleFunc(clickEvt);
            setLikeFunc(res.likes.length);
          })
          .catch(err => console.log(err));
      }
    },
    userStorage
  }, '.elements__template');
  return card;
}


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
buttonAvatar.addEventListener('click', () => popupAvatar.open());
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();
formEdtValid.enableValidation();
formAddValid.enableValidation();
api.getInfoUser()
  .then(info => {
    userStorage = Object.assign({}, info);
    userInfo.setUserInfo({ name: userStorage.name, job: userStorage.about, avatar: userStorage.avatar });
  })
  .catch(err => console.log(err));
api.getInitialCard()
  .then(items => {
    items.forEach(item => {
      elementsSection.addItem(createCard(item).generateCard());
    });
  })
  .catch(err => console.log(err));
