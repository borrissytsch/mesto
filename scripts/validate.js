function enableValidation(validationSettings) {
  const forms2validate = document.querySelectorAll(validationSettings.formSelector);
  forms2validate.forEach(form2validate => {const submit_button = form2validate.querySelector(validationSettings.submitButtonSelector)
    setEventListeners(form2validate, submit_button, validationSettings)
  });
}

function setEventListeners(form2validate, submit_button, validationSettings) {
  form2validate.querySelectorAll(validationSettings.inputSelector).forEach(input_field => {
    input_field.addEventListener('input', evt => {evt.preventDefault;
      performValidation({form: form2validate, input: evt.target, button: submit_button}, validationSettings)
    });
  })
}

function performValidation (validationData, validationSettings) {
  setSubmitButton (validationData.form, validationData.button, validationSettings)
  checkInput (validationData.input, validationSettings)  
}

function setSubmitButton (form, button, validationSettings) {
  if (isFormInvalid(form, validationSettings)) {
    disableButton(button, validationSettings.inactiveButtonClass)
  } else {
    enableButton (button, validationSettings.inactiveButtonClass)
  }
}

function checkInput (input, validationSettings) {
  if (input.validity.valid) {
    setInputValid (input, validationSettings, true)
  } else {
    setInputInvalid (input, validationSettings)
  }
}

function setInputValid (input, validationSettings, clearErrMessage_flag = false) {
  const errorMessage = input.closest(validationSettings.formSelector).querySelector(validationSettings.errorMsgSelector + input.name);
  input.classList.remove(validationSettings.inputErrorClass);
  errorMessage.classList.remove(validationSettings.errorClass);
  if (clearErrMessage_flag) errorMessage.textContent = '';
}

function setInputInvalid (input, validationSettings) {
  const errorMessage = input.closest(validationSettings.formSelector).querySelector(validationSettings.errorMsgSelector + input.name);
  input.classList.add(validationSettings.inputErrorClass);
  errorMessage.classList.add(validationSettings.errorClass);
  errorMessage.textContent = input.validationMessage;
}

function isFormInvalid(form2validate, validationSettings) {
  return Array.from(form2validate.querySelectorAll(validationSettings.inputSelector)).some(input_field => !input_field.validity.valid)
}

function enableButton (button2enable, inactiveButtonClass) {
  button2enable.removeAttribute('disabled')
  button2enable.classList.remove(inactiveButtonClass)
}

function disableButton(button2disable, inactiveButtonClass) {
  button2disable.setAttribute('disabled', true)
  button2disable.classList.add(inactiveButtonClass)
}

function hideErrorFields (form, validationSettings) {
  form.querySelectorAll(validationSettings.inputSelector).forEach(field => {
    setInputValid (field, validationSettings)
  })
}