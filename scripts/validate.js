function performValidation (validationData) {
  if (isFormInvalid(validationData.form)) {
    disableButton(validationData.button)
  } else {
    enableButton (validationData.button)
  }
  if (validationData.input.validity.valid) {
    validationData.input.classList.remove('popup__input_misfilled');
    validationData.input.nextElementSibling.classList.remove('popup__error-msg_visible');
    validationData.input.nextElementSibling.textContent = '';
  } else {
    validationData.input.classList.add('popup__input_misfilled');
    validationData.input.nextElementSibling.classList.add('popup__error-msg_visible');
    validationData.input.nextElementSibling.textContent = validationData.input.validationMessage;
  }
}

function hideErrorFields (form) {
  form.querySelectorAll('.popup__error-msg').forEach(field => field.classList.remove('popup__error-msg_visible'));
  form.querySelectorAll('.popup__input').forEach(field => field.classList.remove('popup__input_misfilled'));
}

function isFormInvalid(form2validate) {
  return Array.from(form2validate.querySelectorAll('.popup__input')).some(input_field => !input_field.validity.valid)
}

function enableButton (button2enable) {
  button2enable.removeAttribute('disabled')
  button2enable.classList.remove('popup__save_disabled')
}

function disableButton(button2disable) {
  button2disable.setAttribute('disabled', true)
  button2disable.classList.add('popup__save_disabled')
}
