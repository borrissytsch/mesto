const profile_edit_button = document.querySelector('.cousteau__box');
const card_add_button = document.querySelector('.cousteau__button');
const profile_name = document.querySelector('.cousteau__title');
const profile_about = document.querySelector('.cousteau__subtitle');
const profilePopup = document.querySelector('.popup.popup_type_profile');
const buttons_close_popup = document.querySelectorAll('.popup__close');
const cardPopup = document.querySelector('.popup.popup_type_card');
const picturePopup = document.querySelector('.popup.popup_type_picture');
const pictureImage = picturePopup.querySelector('.popup__image');
const pictureCaption = picturePopup.querySelector('.popup__caption');
const cards_container = document.querySelector('.table');
const card2add_sample = document.querySelector('.card-template').content.querySelector('.table__cell');
const validationSettings = {formSelector: '.popup__items'
  , inputSelector: '.popup__input'
  , submitButtonSelector: '.popup__save'
  , errorMsgSelector: '.popup__error-msg_type_'
  , inactiveButtonClass: 'popup__save_disabled'
  , inputErrorClass: 'popup__input_misfilled'
  , errorClass: 'popup__error-msg_visible'
}

initialCards.forEach((card) => {cards_container.append(addCard(card))});
profile_edit_button.addEventListener('click', editProfile);
card_add_button.addEventListener('click', renderCard);
document.forms.profiledit_frm.addEventListener('submit', handleEditFormSubmit);
document.forms.cardadd_frm.addEventListener('submit', handleAddCardForm);
buttons_close_popup.forEach(button => {const popup2close = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(popup2close))
});
document.querySelectorAll('.popup').forEach(popup2close => {addEventListener('click',
  evt => {if(evt.target === popup2close) closePopup(popup2close)}
)});
enableValidation(validationSettings);

function addCard (cardData) {
  const card2addFromSample = card2add_sample.cloneNode(true);
  const card2addImage = card2addFromSample.querySelector('.table__image');
  const card2addIcon = card2addFromSample.querySelector('.table__icon');

  card2addImage.alt = cardData.name;
  card2addImage.src = cardData.link;
  card2addFromSample.querySelector('.table__title').textContent = cardData.name;
  card2addIcon.addEventListener('click', 
    () => {card2addIcon.classList.toggle('table__icon_like')}
  );
  card2addFromSample.querySelector('.table__trash').addEventListener('click', 
    () => {card2addFromSample.remove()}
  );
  card2addImage.addEventListener('click', 
    () => {openPicture (card2addImage)}
  );
  return card2addFromSample;
}

function renderCard(){
  restoreForm(document.forms.cardadd_frm);
  openPopup(cardPopup)
}

function editProfile () {
  const thisForm = document.forms.profiledit_frm;
  restoreForm(thisForm, false);
  thisForm.elements.profilename.value = profile_name.textContent;
  thisForm.elements.profilabout.value = profile_about.textContent;
  if (!isFormInvalid (thisForm, validationSettings)) enableButton(profilePopup.querySelector('.popup__save'), validationSettings.inactiveButtonClass);
  openPopup (profilePopup);
}

function openPicture (picture) {
  pictureImage.src = picture.src;
  pictureImage.alt = picture.alt;
  pictureCaption.textContent = picture.alt;
  openPopup (picturePopup);
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',  closeEscape)
}

function closePopup(popup) {
  document.removeEventListener('keydown', closeEscape);
 popup.classList.remove('popup_opened');
}

function closeEscape (evt) {
  if (evt.key === "Escape") {
   const openedPopup = document.querySelector('.popup_opened');
   closePopup(openedPopup);
  }
}

function restoreForm(thisForm, clearFields_flag = true) {
  if (isFormInvalid(thisForm, validationSettings)) {
    hideErrorFields(thisForm, validationSettings)
    disableButton(thisForm.closest('.popup').querySelector('.popup__save'), validationSettings.inactiveButtonClass)
    if (clearFields_flag) clearForm(thisForm);
  }
}

function clearForm (form, fillString = '') {
  form.querySelectorAll('.popup__input').forEach(field => {field.value = fillString})
}

function handleEditFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  profile_name.textContent = document.forms.profiledit_frm.elements.profilename.value;
  profile_about.textContent = document.forms.profiledit_frm.elements.profilabout.value;
  closePopup(profilePopup);
}

function handleAddCardForm (evt) {
  evt.preventDefault();
  const thisForm = document.forms.cardadd_frm;
  cards_container.prepend(addCard({name: thisForm.elements.cardname.value, link: thisForm.elements.cardlink.value}));
  clearForm(thisForm);
  closePopup(cardPopup);
}