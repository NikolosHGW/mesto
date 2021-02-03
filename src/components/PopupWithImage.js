import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { link, nameCard }) {
    super(popupSelector);
    this._link = link;
    this._nameCard = nameCard;
  }

  open(image, caption) {
    super.open();
    image.src = this._link;
    image.alt = this._nameCard;
    caption.textContent = this._nameCard;
  }
}

