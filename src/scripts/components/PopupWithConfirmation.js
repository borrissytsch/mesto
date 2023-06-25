import PopupWithForm from "./PopupWithForm.js";
export default class PopupWithConfirmation extends PopupWithForm {
#handleComfirm;
  constructor (popupSelector, {formSelector, handleFormSubmit}) {
    super(popupSelector, {formSelector, handleFormSubmit});
  }

  open(handleComfirm) {
    if(handleComfirm) this.#handleComfirm = handleComfirm;
    super.open();
  }

  close(confirm_flag = false) {
    if (confirm_flag) this.#handleComfirm();
    super.close();
  }
}