import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmitHandler = formSubmitHandler;
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._sumbitButton = this._form.querySelector('.popup__save-button');
    this._textSubmit = this._sumbitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  loadText() {
    this._sumbitButton.textContent = this._sumbitButton.textContent === this._textSubmit ? 'Сохранение...' : this._textSubmit;
  }
}
