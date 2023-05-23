class FormValidator {
  #form2validate;
  #formFields;
  #validationData;
  constructor (form, validationSettings) {
    this.#form2validate = form;
    this.#formFields = { inputs: form.querySelectorAll(validationSettings.inputSelector)
      , submit_button: this.#form2validate.querySelector(validationSettings.submitButtonSelector)
    };
    this.#validationData = { errorMsgSelector: validationSettings.errorMsgSelector
      , inactiveButtonClass: validationSettings.inactiveButtonClass
      , inputErrorClass: validationSettings.inputErrorClass
      , errorClass: validationSettings.errorClass
    };
  }
  
  enableValidation(eventSet_flag = true, fiedlsClear_flag = false) {
    if (eventSet_flag) this.#setEventListeners();
    this.#restoreForm(fiedlsClear_flag);
  }
  
  #setEventListeners() {
    const submit_button = this.#formFields.submit_button
    this.#formFields.inputs.forEach(input_field => {
      input_field.addEventListener('input', evt => {evt.preventDefault;
        this.#performValidation({input: evt.target, button: submit_button})
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
  
    #restoreForm(clearFields_flag = true) {
    if (clearFields_flag) this.#clearForm();
    if (this.#isFormInvalid()) {
      this.#disableButton(this.#formFields.submit_button, this.#validationData.inactiveButtonClass)
    } else {
      this.#enableButton(this.#formFields.submit_button, this.#validationData.inactiveButtonClass)
    }
    this.#hideErrorFields()
  }

  #hideErrorFields () {
    this.#formFields.inputs.forEach(field => {this.#setInputValid (field)})
  }

  #clearForm (fillString = '') {
    this.#formFields.inputs.forEach(field => {field.value = fillString})
  }
}

export default FormValidator;