import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  #image;
  #caption;
  constructor (popupSelector, {image, caption, button}) {
    super(popupSelector);
    this.#image = this._popupElement.querySelector(image);
    this.#caption = this._popupElement.querySelector(caption);
    super.setEventListeners(button);
  }

  openPopup (picture) {
    this.#image.src = picture.src;
    this.#image.alt = picture.alt;
    this.#caption.textContent = picture.alt;
    super.openPopup()
  }
}