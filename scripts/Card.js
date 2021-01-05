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
  }

  _toggleButtonActive(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }

  _deleteCard(evt) {
    evt.target.closest(".element").remove();
  }

  _setEventListeners(){
    this._buttonLikeElement.addEventListener("click", evt => {this._toggleButtonActive(evt)});
    this._buttonDelElement.addEventListener("click", evt => {this._deleteCard(evt)});
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
