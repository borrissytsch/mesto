import PopupWithForm from "./PopupWithForm.js";
export default class PopupWithConfirmation extends PopupWithForm {
#cardElement;
#cardID;
  constructor (popupSelector, {formSelector, handleFormSubmit}) {
    super(popupSelector, {formSelector, handleFormSubmit});
  }

  open(cardElement, cardID) {
    this.#cardElement = cardElement; this.#cardID = cardID;
    super.open();
  }

  close(deleteCardHandler) {
    deleteCardHandler(this.#cardID, this.#cardElement)
    super.close();
  }
}