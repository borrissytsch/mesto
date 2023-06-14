import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  #image;
  #caption;
  #button;
  constructor (popupSelector, {image, caption, button}) {
    super(popupSelector);
    this.#image = this._popupElement.querySelector(image);
    this.#caption = this._popupElement.querySelector(caption);
    this.#button = this._popupElement.querySelector(button);
    this.#setEventListeners();
  }

  #setEventListeners() {
    this.#button.addEventListener('click', () => this.close());
  }

  open (picture) {
    this.#image.src = picture.src;
    this.#image.alt = picture.alt;
    this.#caption.textContent = picture.alt;
    super.open()
  }
}