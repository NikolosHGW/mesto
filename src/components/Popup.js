export default class Popup {
  constructor(popupSelector, body) {
    this._popup = document.querySelector(popupSelector);
    this._body = body;
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._body.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._body.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close();
      }
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
  }
}
