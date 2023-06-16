import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  #image;
  #caption;
  constructor (popupSelector, {image, caption}) {
    super(popupSelector);
    this.#image = this._popupElement.querySelector(image);
    this.#caption = this._popupElement.querySelector(caption);
  }

  open (picture) {
    this.#image.src = picture.src;
    this.#image.alt = picture.alt;
    this.#caption.textContent = picture.alt;
    super.open()
  }
}