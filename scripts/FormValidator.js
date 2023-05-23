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
    const submitButton = this.#formFields.submitButton
    this.#formFields.inputs.forEach(input_field => {
      input_field.addEventListener('input', evt => {evt.preventDefault;
        this.#performValidation({input: evt.target, button: submitButton})
      });
    })
  }

  #performValidation (validationFields) {
    if (validationFields.input.validity.valid) {
      this.#setInputValid (validationFields.input, true);
      if (!this.#isFormInvalid()) this.#enableButton (validationFields.button, this.#validationData.inactiveButtonClass);
    } else {
      this.#setInputInvalid (validationFields.input);
      this.#disableButton(validationFields.button, this.#validationData.inactiveButtonClass);
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

  #enableButton (button2enable, inactiveButtonClass) {
    button2enable.removeAttribute('disabled')
    button2enable.classList.remove(inactiveButtonClass)
  }
  
  #disableButton (button2disable, inactiveButtonClass) {
    button2disable.setAttribute('disabled', true)
    button2disable.classList.add(inactiveButtonClass)
  }

  #hideErrorFields () {
    this.#formFields.inputs.forEach(field => {this.#setInputValid (field)})
  }
  
  restoreForm() {
    if (this.#isFormInvalid()) {
      this.#disableButton(this.#formFields.submitButton, this.#validationData.inactiveButtonClass)
    } else {
      this.#enableButton(this.#formFields.submitButton, this.#validationData.inactiveButtonClass)
    }
    this.#hideErrorFields()
  }
}

export default FormValidator;