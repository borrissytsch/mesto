import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  #form;
  #handleFormSubmit;
  constructor (popupSelector, {formSelector, handleFormSubmit}) {
    super(popupSelector);
    this.#form = this._popupElement.querySelector(formSelector);
    this.#handleFormSubmit = handleFormSubmit;
    this.#setEventListeners();
  }

  #setEventListeners() {
    this.#form.addEventListener('submit'
      , (evt) => {evt.preventDefault(); this.#handleFormSubmit(this._getInputValues())}
    );
  }

  open(presetForm) {
    if (presetForm) presetForm();
    super.open();
  }

  close() {
    this.#form.reset();
    super.close();
  }

  //#getInputValues() {
  _getInputValues() {
    const inputValues = {};
    Array.from(this.#form.elements).forEach(element => {
      if(element.hasAttribute('name')) inputValues[element.name] = this.#form.elements[element.name].value
    });
    return inputValues;
  }
}