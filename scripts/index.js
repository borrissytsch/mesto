import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
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

const validationSettings = { inputSelector: '.popup__input'
  , submitButtonSelector: '.popup__save'
  , errorMsgSelector: '.popup__error-msg_type_'
  , inactiveButtonClass: 'popup__save_disabled'
  , inputErrorClass: 'popup__input_misfilled'
  , errorClass: 'popup__error-msg_visible'
};
const cardSettings = {templateSelector: '.card-template'
  , containerSelector: '.table__cell'
  , imageSelector: '.table__image'
  , iconSelector: '.table__icon'
  , titleSelector: '.table__title'
  , trashSelector: '.table__trash'
  , likeIconClass: 'table__icon_like'
  , openPopupMethod: openPopup
  , picturePopupRef: picturePopup
  , pictureImageRef: pictureImage
  , pictureCaptionRef: pictureCaption
};
const profileValidator = new FormValidator(profilePopup.querySelector('.popup__items'), validationSettings);
const cardValidator = new FormValidator(cardPopup.querySelector('.popup__items'), validationSettings);

initialCards.forEach((card) => {const card2add = new Card(card, cardSettings).getCard();
  cards_container.append(card2add);
});
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
profileValidator.enableValidation(); cardValidator.enableValidation();

function renderCard(){
  cardValidator.enableValidation(false, true);
  openPopup(cardPopup)
}

function editProfile () {
  const thisForm = document.forms.profiledit_frm;
  thisForm.elements.profilename.value = profile_name.textContent;
  thisForm.elements.profilabout.value = profile_about.textContent;
  profileValidator.enableValidation(false);
  openPopup (profilePopup);
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
  const card2add = new Card({name: thisForm.elements.cardname.value, link: thisForm.elements.cardlink.value}, cardSettings).getCard();
  cards_container.prepend(card2add);
  closePopup(cardPopup);
}