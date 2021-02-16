export default class Card {
  constructor({ data, handleCardClick, handleCardDelete, userStorage, api }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._ownerCardID = data.owner._id;
    this._cardID = data._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._userID = userStorage._id;
    this._api = api;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);

    return cardElement;
  }

  _initVariables() {
    this._imgElement = this._element.querySelector('.element__img');
    this._headingElement = this._element.querySelector('.element__heading');
    this._buttonLikeElement = this._element.querySelector('.element__like-button');
    this._buttonImgElement = this._element.querySelector('.element__img-button');
    this._likesElement = this._element.querySelector('.element__count');
  }

  _toggleButtonActive(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _deleteCard(evt) {
    this._api.deleteCard(this._cardID)
      .then(() => {evt.target.closest('.element').remove()})
      .catch(err => console.log(err));
  }

  _setEventListeners(){
    this._buttonLikeElement.addEventListener('click', evt => {this._toggleButtonActive(evt)});
    this._buttonImgElement.addEventListener('click', () => {this._handleCardClick(this._link, this._name)});
  }

  _setDeleteCard() {
    if (this._userID === this._ownerCardID) {
      this._buttonDelElement = this._element.querySelector('.element__del-button');
      this._buttonDelElement.classList.add('element__del-button_visible');
      this._buttonDelElement.addEventListener('click', evt => {
        this._handleCardDelete(this._deleteCard.bind(this), evt);
      });
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._initVariables();
    this._setEventListeners();
    this._setDeleteCard();

    this._imgElement.src = this._link;
    this._imgElement.alt = 'Загруженная картинка: ' + this._name;
    this._headingElement.textContent = this._name;
    this._likesElement.textContent = this._likes;

  	return this._element;
  }
}
