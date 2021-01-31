import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { link, name }) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }

  open(image, caption) {
    super.open();
    image.src = this._link;
    image.alt = this._name;
    caption = this._name;
  }
}

