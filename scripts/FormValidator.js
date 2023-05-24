class FormValidator {
  #form2validate;
  #formFields;
  #validationData;
  constructor (form, validationSettings) {
    this.#form2validate = form;
    this.#formFields = { inputs: form.querySelectorAll(validationSettings.inputSelector)
      , submitButton: this.#form2validate.querySelector(validationSettings.submitButtonSelector)
    };
    this.#validationData = { errorMsgSelector: validationSettings.errorMsgSelector
      , inactiveButtonClass: validationSettings.inactiveButtonClass
      , inputErrorClass: validationSettings.inputErrorClass
      , errorClass: validationSettings.errorClass
    };
  }
  
  enableValidation() {
    this.#setEventListeners();
  }
  
  #setEventListeners() {
    this.#formFields.inputs.forEach(input_field => {
      input_field.addEventListener('input', evt => {evt.preventDefault;
        this.#performValidation(evt.target)
      });
    })
  }

  #performValidation (input) {
    if (input.validity.valid) {
      this.#setInputValid (input, true);
      if (!this.#isFormInvalid()) this.#enableButton ();
    } else {
      this.#setInputInvalid (input);
      this.#disableButton();
    }
  }

  #setInputValid (input, clearErrMessage_flag = false) {
    const errorMessage = this.#form2validate.querySelector(this.#validationData.errorMsgSelector + input.name);
    input.classList.remove(this.#validationData.inputErrorClass);
    errorMessage.classList.remove(this.#validationData.errorClass);
    if (clearErrMessage_flag) errorMessage.textContent = '';
  }

  #setInputInvalid (input) {
    const errorMessage = this.#form2validate.querySelector(this.#validationData.errorMsgSelector + input.name);
    input.classList.add(this.#validationData.inputErrorClass);
    errorMessage.classList.add(this.#validationData.errorClass);
    errorMessage.textContent = input.validationMessage;
  }

  #isFormInvalid() {
    return Array.from(this.#formFields.inputs).some(input_field => !input_field.validity.valid);
  }

  #enableButton () {
    this.#formFields.submitButton.removeAttribute('disabled')
    this.#formFields.submitButton.classList.remove(this.#validationData.inactiveButtonClass)
  }
  
  #disableButton () {
    this.#formFields.submitButton.setAttribute('disabled', true)
    this.#formFields.submitButton.classList.add(this.#validationData.inactiveButtonClass)
  }

  #hideErrorFields () {
    this.#formFields.inputs.forEach(field => {this.#setInputValid (field)})
  }
  
  restoreForm() {
    if (this.#isFormInvalid()) {
      this.#disableButton()
    } else {
      this.#enableButton()
    }
    this.#hideErrorFields()
  }
}

export default FormValidator;