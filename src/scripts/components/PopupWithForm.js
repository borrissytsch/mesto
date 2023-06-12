import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  #form;
  #handleFormSubmit;
  #button;
  constructor (popupSelector, {formSelector, handleFormSubmit, button}) {
    super(popupSelector);
    this.#form = document.querySelector(popupSelector).querySelector(formSelector);
    this.#handleFormSubmit = handleFormSubmit;
    this.#button = button;
    this.#setEventListeners();
  }

  #setEventListeners() {
    super.setEventListeners(this.#button);
    this.#form.addEventListener('submit', this.#handleFormSubmit);
  }

  openPopup(presetForm) {
    if (presetForm) presetForm();
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }

  #getInputValues() {
    const inputValues = [];
    Array.from(this.#form.elements).forEach(element => {
      if(element.hasAttribute('name')) inputValues.push({[element.name]: this.#form.elements[element.name].value})
    });
    return inputValues;
  }
}