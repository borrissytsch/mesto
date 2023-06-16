import '../../pages/index.css';                                     // добавьте импорт главного файла стилей
import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonOpenEditProfileForm = document.querySelector(constants.profileEditButtonSelector);
const buttonOpenAddCardForm = document.querySelector(constants.cardAddButtonSelector);
const profileForm = document.querySelector(constants.profileSelector).querySelector(constants.formSelector);
const cardForm = document.querySelector(constants.cardSelector).querySelector(constants.formSelector);

const profilePopup = new PopupWithForm(constants.profileSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleEditFormSubmit
});
const cardPopup = new PopupWithForm(constants.cardSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleAddCardForm
});
const picturePopup = new PopupWithImage( constants.pictureSelector
  , {image: constants.pictureImageSelector, caption: constants.pictureCaptionSelector}
);
const userInfo = new UserInfo({name: constants.userNameSelector, about: constants.userAboutSelector});
const profileValidator = new FormValidator(profileForm, constants.validationSettings);
const cardValidator = new FormValidator(cardForm, constants.validationSettings);

constants.cardSettings.handleCardClick = picturePopup.open.bind(picturePopup);
const cardsList = new Section({ items: constants.initialCards, renderer: 
  (card, container) => {container.append(createCard(card, constants.cardSettings))}}
  , constants.cardContainerSelector
).renderItems();

buttonOpenEditProfileForm.addEventListener('click', () => profilePopup.open(presetProfileForm));
buttonOpenAddCardForm.addEventListener('click', () => cardPopup.open(presetCardForm));
profileValidator.enableValidation(); cardValidator.enableValidation();

function presetCardForm(){
  cardValidator.restoreForm();
}

function presetProfileForm () {
  profileForm.elements.profilename.value = userInfo.getUserInfo().name;
  profileForm.elements.profilabout.value = userInfo.getUserInfo().about;
  profileValidator.restoreForm();
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  userInfo.setUserInfo({ name: profileForm.elements.profilename.value
    , about: profileForm.elements.profilabout.value}
  );
  profilePopup.close();
}

function handleAddCardForm (evt) {
  evt.preventDefault();
  cardsList.addItem(
    createCard({name: cardForm.elements.cardname.value, link: cardForm.elements.cardlink.value}, constants.cardSettings)
  );
  cardPopup.close();
}

function createCard({name: cardCaption, link: cardAddress}, cardSettings) {
  return new Card({name: cardCaption, link: cardAddress}, cardSettings).getCard();
}