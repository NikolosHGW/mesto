import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmitHandler = formSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitHandler();
    });
  }

  open(newFormSubmitHandler) {
    super.open();
    this._formSubmitHandler = newFormSubmitHandler;
  }
}
