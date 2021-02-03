import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup-img__img');
    this._caption = this._popup.querySelector('.popup-img__caption');
  }

  open(link, nameCard) {
    super.open();
    this._image.src = link;
    this._image.alt = nameCard;
    this._caption.textContent = nameCard;
  }
}

