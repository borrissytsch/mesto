const popup_main_page = document.querySelector('.popup');
const edit_button = document.querySelector('.cousteau__box');
const close_button = document.querySelector('.popup__close');
const profiledit_frm = document.querySelector('.popup__items');
const input_name_field = document.querySelector(".popup__input.popup__input_type_name");
const input_about_field = document.querySelector(".popup__input.popup__input_type_about");
const profile_name = document.querySelector('.cousteau__title');
const profile_about = document.querySelector('.cousteau__subtitle');

edit_button.addEventListener('click', editProfile);
close_button.addEventListener('click', closeProfile);
profiledit_frm.addEventListener('submit', handleFormSubmit);

// Подготовительная секция для закрашивания toggl'ом сердечка на Карачаевске
const heart_icon = document.querySelector('.table__icon');
heart_icon.addEventListener('click', toggleIconСolor);
function toggleIconСolor() {
  heart_icon.classList.toggle('table__icon_like');
}

function editProfile () {
  popup_main_page.setAttribute('class', "popup popup_opened");
  input_name_field.value = profile_name.textContent;
  input_about_field.value = profile_about.textContent;
}

function closeProfile() {
  popup_main_page.setAttribute('class', "popup");
}

function handleFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
    profile_name.textContent = input_name_field.value;
    profile_about.textContent = input_about_field.value;
    closeProfile();
}