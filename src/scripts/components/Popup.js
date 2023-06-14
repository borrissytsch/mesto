export default class Popup {
  #popupOpenClass;
  constructor (popupSelector) {
    this.#popupOpenClass = 'popup_opened';
      this._popupElement = document.querySelector(popupSelector);
    this.#setEventListeners();
  }

  #setEventListeners() {
    addEventListener('click', evt => {if(evt.target === this._popupElement) this.close()});
    document.addEventListener('keydown',  this.#handleEscClose.bind(this));
  }

  open () {
    this._popupElement.classList.add(this.#popupOpenClass);
  }

  close() {
    document.removeEventListener('keydown', this.#handleEscClose);
    this._popupElement.classList.remove(this.#popupOpenClass);
  }

  #handleEscClose (evt) {
    if (evt.key === "Escape") this.close();
  }
}