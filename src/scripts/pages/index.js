import '../../pages/index.css';                                     // добавьте импорт главного файла стилей
import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileEdit_button = document.querySelector('.cousteau__box');
const cardAdd_button = document.querySelector('.cousteau__button');
const profileForm = document.querySelector(constants.profileSelector).querySelector(constants.formSelector);
const cardForm = document.querySelector(constants.cardSelector).querySelector(constants.formSelector);

const profilePopup = new PopupWithForm( constants.profileSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleEditFormSubmit
  , button: constants.buttonCloseSelector}
);
const cardPopup = new PopupWithForm( constants.cardSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleAddCardForm
  , button: constants.buttonCloseSelector}
);
const picturePopup = new PopupWithImage( constants.pictureSelector
  , {image: constants.pictureImageSelector, caption: constants.pictureCaptionSelector, button: constants.buttonCloseSelector}
);
const userCousteau = new UserInfo({name: constants.userNameSelector, about: constants.userAboutSelector});
const profileValidator = new FormValidator(profileForm, constants.validationSettings);
const cardValidator = new FormValidator(cardForm, constants.validationSettings);

constants.cardSettings.handleCardClick = picturePopup.openPopup.bind(picturePopup);
new Section({ items: constants.initialCards, renderer: 
  (card, container) => {container.append(new Card(card, constants.cardSettings).getCard())}}
  , constants.cardContainerSelector
).renderItems();

profileEdit_button.addEventListener('click', () => profilePopup.openPopup(presetProfileForm));
cardAdd_button.addEventListener('click', () => cardPopup.openPopup(presetCardForm));
profileValidator.enableValidation(); cardValidator.enableValidation();

function presetCardForm(){
  clearForm (cardForm);
  cardValidator.restoreForm();
}

function presetProfileForm () {
  profileForm.elements.profilename.value = userCousteau.getUserInfo().name;
  profileForm.elements.profilabout.value = userCousteau.getUserInfo().about;
  profileValidator.restoreForm();
}

function clearForm (form, fillString = '') {
  form.querySelectorAll(constants.inputSelector).forEach(field => {field.value = fillString});
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  userCousteau.setUserInfo({ name: profileForm.elements.profilename.value
    , about: profileForm.elements.profilabout.value}
  );
  profilePopup.closePopup();
}

function handleAddCardForm (evt) {
  evt.preventDefault();
  new Section ({items: new Card({ name: cardForm.elements.cardname.value, link: cardForm.elements.cardlink.value}
    , constants.cardSettings).getCard()}
    , constants.cardContainerSelector
  ).addItem();
  cardPopup.closePopup();
}