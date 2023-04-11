const thisForm = document.querySelector('.profiledit');
const edit_button = document.querySelector('.cousteau__button');
const close_button = document.querySelector('.profiledit__close');
const save_button = document.querySelector('.profiledit__save');
const inputName = document.querySelector(".profiledit__input:first-of-type");
const inputAbout = document.querySelector(".profiledit__input:last-of-type");
const profileName = document.querySelector('.cousteau__title');
const profileAbout = document.querySelector('.cousteau__subtitle');

edit_button.addEventListener('click', editProfile);
save_button.addEventListener('click', saveProfile);
close_button.addEventListener('click', closeProfile);

function editProfile () {
  thisForm.setAttribute('class', "profiledit profiledit_opened");
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}
function closeProfile() {
  inputName.value = null;
  inputAbout.value = null;
  thisForm.setAttribute('class', "profiledit");
}
function saveProfile() {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeProfile();
  // Находим форму в DOM: thisForm
  // Находим поля формы в DOM: inputName & inputAbout
  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  formElement.addEventListener('submit', handleFormSubmit);
}
function handleFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  // Получите значение полей jobInput и nameInput из свойства value: получено в saveProfile
  // Выберите элементы, куда должны быть вставлены значения полей: выбрано в saveProfile
  // Вставьте новые значения с помощью textContent: вставлено в saveProfile
  alert(`Form data ${inputName.value} and ${inputAbout.value} have been submitted 2 server; form ${thisForm.getAttribute('class')} was closed`);
}