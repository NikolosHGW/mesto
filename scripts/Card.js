export default class Card {
  constructor(data, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);

    return cardElement;
  }

  _initialVariables() {
    this._imgElement = this._element.querySelector(".element__img");
    this._headingElement = this._element.querySelector(".element__heading");
    this._buttonLikeElement = this._element.querySelector(".element__like-button");
    this._buttonDelElement = this._element.querySelector(".element__del-button");
    this.buttonImgElement = this._element.querySelector(".element__img-button");
    this._bigImg = document.querySelector(".popup-img__img");
    this._captionBigImg = document.querySelector(".popup-img__caption");
    this._popupImg = document.querySelector(".popup_img");
    this._body = document.querySelector(".body");
    // this._buttonClsImg = this._popupImg.querySelector(".popup__close-icon");
  }

  _toggleButtonActive(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _deleteCard(evt) {
    evt.target.closest(".element").remove();
  }

  // //Функция для открытия Popup окон
  // _openPopup(popup) {
  //   popup.classList.add("popup_opened"); //добавляет стиль с visibility:visible, чтобы перекрыть visibility:hide
  //   this._addAnyListeners(this._body, "keydown", this._closePopupWithEscape);
  // }

  // //Функция для закрытия Popup окон
  // _closePopup(popup) {
  //   popup.classList.remove("popup_opened"); // убирает модификатор со стилем visibility:visible
  //   this._removeAnyListeners(this._body, "keydown", this._closePopupWithEscape);
  // }

  // _closePopupWithEscape(evt) {
  //   if (evt.key == "Escape") {
  //     const openedPopup = document.querySelector('.popup_opened')
  //     if (openedPopup) {
  //       this._closePopup(openedPopup);
  //     }
  //   }
  // }

  // //Функция для добавления слушателя на любой элемент
  // _addAnyListeners(element, eventString, func) {
  //   element.addEventListener(eventString, func);
  // }

  // //Функция для удаления слушателя с любого элемента
  // _removeAnyListeners(element, eventString, func) {
  //   element.removeEventListener(eventString, func);
  // }

  // _openPopupImg() {
  //   this._bigImg.src = this._link;
  //   this._bigImg.alt = this._name;
  //   this._captionBigImg.textContent = this._name;
  //   this._openPopup(this._popupImg);
  // }

  _setEventListeners(){
    this._buttonLikeElement.addEventListener("click", evt => {this._toggleButtonActive(evt)});
    this._buttonDelElement.addEventListener("click", evt => {this._deleteCard(evt)});
    // this._buttonImgElement.addEventListener("click", () => {this._openPopupImg()});
    // this._buttonClsImg.addEventListener("click", () => {this._closePopup(this._popupImg)});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._initialVariables();
    this._setEventListeners();

    this._imgElement.src = this.link;
    this._imgElement.alt = "Загруженная картинка: " + this.name;
    this._headingElement.textContent = this.name;

  	return this._element;
  }
}
