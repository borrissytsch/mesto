export default class Popup {
  #popupOpenClass;
  #listenerSet_flag;
  constructor (popupSelector) {
    this.#popupOpenClass = 'popup_opened';
    this.#listenerSet_flag = true;
    this._popupElement = document.querySelector(popupSelector);
    this.setEventListeners();
  }
  
  setEventListeners(closeButtonSelector) {
    if (this.#listenerSet_flag) {
      addEventListener('click', evt => {if(evt.target === this._popupElement) this.closePopup()});
      this.#listenerSet_flag = false;
    } else {
      if (closeButtonSelector) {this._popupElement.querySelector(closeButtonSelector).addEventListener('click',
        () => this.closePopup());
      }
    }
  }

  openPopup () {
    this._popupElement.classList.add(this.#popupOpenClass);
    document.addEventListener('keydown',  this.#handleEscClose.bind(this))
  }
  
   closePopup() {
    document.removeEventListener('keydown', this.#handleEscClose.bind(this));
    this._popupElement.classList.remove(this.#popupOpenClass);
  }
  
   #handleEscClose (evt) {
    if (evt.key === "Escape") this.closePopup();
  }
}
