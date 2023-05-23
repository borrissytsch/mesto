import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const profileEdit_button = document.querySelector('.cousteau__box');
const cardAdd_button = document.querySelector('.cousteau__button');
const profileName = document.querySelector('.cousteau__title');
const profileAbout = document.querySelector('.cousteau__subtitle');
const profilePopup = document.querySelector('.popup.popup_type_profile');
const buttonsClose_popup = document.querySelectorAll('.popup__close');
const cardPopup = document.querySelector('.popup.popup_type_card');
const picturePopup = document.querySelector('.popup.popup_type_picture');
const pictureImage = picturePopup.querySelector('.popup__image');
const pictureCaption = picturePopup.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.table');
const cardPicture_refs = { openPopupMethod: openPopup
  , picturePopupRef: picturePopup
  , pictureImageRef: pictureImage
  , pictureCaptionRef: pictureCaption
};

const profileValidator = new FormValidator(profilePopup.querySelector('.popup__items'), validationSettings);
const cardValidator = new FormValidator(cardPopup.querySelector('.popup__items'), validationSettings);

cardSettings.pictureRefs = cardPicture_refs;
initialCards.forEach((card) => {const card2add = new Card(card, cardSettings).getCard();
  cardsContainer.append(card2add);
});
profileEdit_button.addEventListener('click', editProfile);
cardAdd_button.addEventListener('click', renderCard);
document.forms.profiledit_frm.addEventListener('submit', handleEditFormSubmit);
document.forms.cardadd_frm.addEventListener('submit', handleAddCardForm);
buttonsClose_popup.forEach(button => {const popup2close = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(popup2close))
});
document.querySelectorAll('.popup').forEach(popup2close => {addEventListener('click',
  evt => {if(evt.target === popup2close) closePopup(popup2close)}
)});
profileValidator.enableValidation(); cardValidator.enableValidation();

function renderCard(){
  clearForm (document.forms.cardadd_frm)
  cardValidator.restoreForm();
  openPopup(cardPopup);
}

function editProfile () {
  const thisForm = document.forms.profiledit_frm;
  thisForm.elements.profilename.value = profileName.textContent;
  thisForm.elements.profilabout.value = profileAbout.textContent;
  profileValidator.restoreForm();
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

function clearForm (form, fillString = '') {
  form.querySelectorAll('.popup__input').forEach(field => {field.value = fillString})
}

function handleEditFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault();
  profileName.textContent = document.forms.profiledit_frm.elements.profilename.value;
  profileAbout.textContent = document.forms.profiledit_frm.elements.profilabout.value;
  closePopup(profilePopup);
}

function handleAddCardForm (evt) {
  evt.preventDefault();
  const thisForm = document.forms.cardadd_frm;
  const card2add = new Card({name: thisForm.elements.cardname.value, link: thisForm.elements.cardlink.value}, cardSettings).getCard();
  cardsContainer.prepend(card2add);
  closePopup(cardPopup);
}