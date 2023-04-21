const thisForm = document.querySelector('.popup');
const edit_button = document.querySelector('.cousteau__box');
const close_button = document.querySelector('.popup__close');
const inputName = document.querySelector(".popup__input.popup__input_type_name");
const inputAbout = document.querySelector(".popup__input.popup__input_type_about");
const profileName = document.querySelector('.cousteau__title');
const profileAbout = document.querySelector('.cousteau__subtitle');

edit_button.addEventListener('click', editProfile);
close_button.addEventListener('click', closeProfile);
thisForm.addEventListener('submit', handleFormSubmit);

function editProfile () {
  thisForm.setAttribute('class', "popup popup_opened");
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function closeProfile() {
  thisForm.setAttribute('class', "popup");
}

function handleFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeProfile();
}