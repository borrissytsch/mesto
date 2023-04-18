const thisForm = document.querySelector('.popup');
const edit_button = document.querySelector('.cousteau__box');
const close_button = document.querySelector('.popup__close');
/* const save_button = document.querySelector('.popup__save'); */
const inputName = document.querySelector(".popup__input.popup__input_type_name");
const inputAbout = document.querySelector(".popup__input.popup__input_type_about");
const profileName = document.querySelector('.cousteau__title');
const profileAbout = document.querySelector('.cousteau__subtitle');

edit_button.addEventListener('click', editProfile);
/* save_button.addEventListener('click', saveProfile); */
close_button.addEventListener('click', closeProfile);
formElement.addEventListener('submit', handleFormSubmit);

function editProfile () {
  thisForm.setAttribute('class', "popup popup_opened");
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function closeProfile() {
 /* inputName.value = null;
  inputAbout.value = null; */
  thisForm.setAttribute('class', "popup");
}

/* function saveProfile() {
  
} */

function handleFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  // Находим форму в DOM: thisForm
  // Находим поля формы в DOM: inputName & inputAbout
  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  // Получите значение полей jobInput и nameInput из свойства value:
  // Выберите элементы, куда должны быть вставлены значения полей:
  // Вставьте новые значения с помощью textContent:
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closeProfile();

}