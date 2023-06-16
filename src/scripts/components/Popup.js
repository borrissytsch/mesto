import {buttonCloseSelector} from "../utils/constants.js";
export default class Popup {
  #popupOpenClass;
  #handleEscCloseBinded;
  #button;
  constructor (popupSelector) {
    this.#popupOpenClass = 'popup_opened';
    this.#handleEscCloseBinded = this.#handleEscClose.bind(this);
    this._popupElement = document.querySelector(popupSelector);
    this.#button = this._popupElement.querySelector(buttonCloseSelector);
    this.#setEventListeners();
  }

  #setEventListeners() {
    this.#button.addEventListener('click', () => this.close());
    addEventListener('click', evt => {if(evt.target === this._popupElement) this.close()});
  }

  open () {
    document.addEventListener('keydown', this.#handleEscCloseBinded);
    this._popupElement.classList.add(this.#popupOpenClass);
  }

  close() {
    document.removeEventListener('keydown', this.#handleEscCloseBinded);
    this._popupElement.classList.remove(this.#popupOpenClass);
  }

  #handleEscClose (evt) {
    if (evt.key === "Escape") this.close();
  }
}