const edit_button = document.querySelector('.cousteau__box');
const add_button = document.querySelector('.cousteau__button');
const profile_name = document.querySelector('.cousteau__title');
const profile_about = document.querySelector('.cousteau__subtitle');
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

let cards_container = document.querySelector('.table');
let popups = document.querySelectorAll('.popup');
const popup_form_selector = '.popup__items.popup__items_type_';
const popup_type_form = 'form';
const popup_type_picture = 'picture';
const form_target_fields = [null, null];
const form_value_fields = [null, null];
let popup_main_page = null;

document.querySelectorAll(".table__cell").forEach((cardItem, index) => {
  if (index > initialCards.length - 1) return index;
  let cardImage = cardItem.querySelector(".table__image");
  cardImage.src = initialCards[index].link; cardImage.alt = initialCards[index].name;
  cardItem.querySelector(".table__title").textContent = initialCards[index].name;
});

edit_button.addEventListener('click', editProfile);
add_button.addEventListener('click', addCard);
cards_container.querySelectorAll('.table__icon').forEach((item) => {item.addEventListener('click', 
  () => {item.classList.toggle('table__icon_like')}
)} );
cards_container.querySelectorAll('.table__trash').forEach((item) => {item.addEventListener('click', 
  () => {item.parentElement.remove()}

)} );
cards_container.querySelectorAll('.table__image').forEach((item) => {item.addEventListener('click', 
  () => {openPicturePopup (item)}
)} );

function addCard () {
  openPopupSetup ([popup_form_selector, 'card-add'], handleAddFormSubmit);
}

function editProfile () {
  openPopupSetup ([popup_form_selector, 'profile-edit'], handleEditFormSubmit);
  let index = 0;
    form_target_fields[index++] = profile_name;
    form_target_fields[index++] = profile_about;
  if (form_value_fields.length === form_target_fields.length) {
    form_value_fields.forEach((item, index) => {item.value = form_target_fields[index].textContent})
  } else {
    alert("editProfile form value & taget fields dimensions Error:" + form_value_fields.length + "/" + form_target_fields.length)
  }
}

function openPicturePopup (picture) {
  const picture2open_sample = document.querySelector('.piture-popup-template').content.querySelector('.popup').cloneNode(true);
  picture2open_sample.querySelector('.popup__image').src = picture.src;
  picture2open_sample.querySelector('.popup__image').alt = picture.alt;
  picture2open_sample.querySelector('.popup__caption').textContent = picture.alt;
  popups[0].before(picture2open_sample);
  popups = document.querySelectorAll('.popup');
  openPopupSetup (['.popup__container.popup__container_type_', popup_type_picture])
}

function closeProfile() {
  popup_main_page.classList.remove('popup_opened');
}

function handleEditFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  if (form_value_fields.length === form_target_fields.length) {
    form_value_fields.forEach((item, index) => {form_target_fields[index].textContent = item.value})
  } else {
    alert("editFormHandler value & taget fields dimensions Error:" + form_value_fields.length + "/" + form_target_fields.length)
  }
  closeProfile();
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  let card2add_sample = document.querySelector('.card-template').content.querySelector('.table__cell').cloneNode(true);
  for (let item of card2add_sample.children) {
    if (item.classList.contains('table__image')) {
      item.alt = form_value_fields[0].value;
      item.src = form_value_fields[1].value;
    }
    if (item.classList.contains('table__title')) {
      item.textContent = form_value_fields[0].value;
    }
  }
  cards_container.prepend(card2add_sample);
  card2add_sample.querySelector('.table__icon').addEventListener('click', 
    () => {card2add_sample.querySelector('.table__icon').classList.toggle('table__icon_like')}
  );
  card2add_sample.querySelector('.table__trash').addEventListener('click', 
    () => {card2add_sample.remove()}
  );
  card2add_sample.querySelector('.table__image').addEventListener('click', 
    () => {openPicturePopup (card2add_sample.querySelector('.table__image'))}
  );
  cards_container = document.querySelector('.table');
  closeProfile();
}

function openPopupSetup (elts_selectors, handleForm) {
  const postfix_idx = 1;
  let popup_found_flag = false;
  popups.forEach((popup_item, index) => {
    let this_form = popup_item.querySelector(elts_selectors.join(''));
    if (this_form) {
      if (popup_found_flag) return; popup_found_flag = true;
      popup_main_page = popups[index];
      setTimeout(() => popup_main_page.classList.add('popup_opened'), 100);
      popup_main_page.querySelector('.popup__close.popup__close_type_' + elts_selectors[postfix_idx]).addEventListener('click', closeProfile);
      if (handleForm) {
        let i = 0;
        for (let item of document.querySelector('.popup__fields.popup__fields_type_' + elts_selectors[postfix_idx]).children) {
          form_value_fields[i++] = item;
        }
        this_form.addEventListener('submit', handleForm);
      }
    }
  });
}