import '../../pages/index.css';                                     // добавьте импорт главного файла стилей
import * as constants from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const buttonOpenAvatarEditForm = document.querySelector(constants.avatarEditButtonSelector);
const buttonOpenEditProfileForm = document.querySelector(constants.profileEditButtonSelector);
const buttonOpenAddCardForm = document.querySelector(constants.cardAddButtonSelector);
const avatarForm = document.querySelector(constants.avatarSelector).querySelector(constants.formSelector);
const profileForm = document.querySelector(constants.profileSelector).querySelector(constants.formSelector);
const cardForm = document.querySelector(constants.cardSelector).querySelector(constants.formSelector);
// const confirmForm = document.querySelector(constants.confirmSelector).querySelector(constants.formSelector); // not used now

const avatarPopup = new PopupWithForm(constants.avatarSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleAvatarFormSubmit
});
const profilePopup = new PopupWithForm(constants.profileSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleEditFormSubmit
});
const cardPopup = new PopupWithForm(constants.cardSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleAddCardForm
});
const confirmPopup = new PopupWithConfirmation(constants.confirmSelector, {formSelector: constants.formSelector
  , handleFormSubmit: handleConfirmForm
});
const picturePopup = new PopupWithImage( constants.pictureSelector
  , {image: constants.pictureImageSelector, caption: constants.pictureCaptionSelector}
);
const userInfo = new UserInfo({name: constants.userNameSelector, about: constants.userAboutSelector});
const avatarValidator = new FormValidator(avatarForm, constants.validationSettings);
const profileValidator = new FormValidator(profileForm, constants.validationSettings);
const cardValidator = new FormValidator(cardForm, constants.validationSettings);

constants.cardSettings.handleCardClick = picturePopup.open.bind(picturePopup);
const cardsList = new Section({ items: constants.initialCards, renderer: 
  (card, container) => {container.append(createCard(card
  , {cardSettings: constants.cardSettings, handleCardTrash, handleCardLike}))}}
  , constants.cardContainerSelector
).renderItems();

buttonOpenAvatarEditForm.addEventListener('click', () => avatarPopup.open(presetAvatarForm));
buttonOpenEditProfileForm.addEventListener('click', () => profilePopup.open(presetProfileForm));
buttonOpenAddCardForm.addEventListener('click', () => cardPopup.open(presetCardForm));
avatarValidator.enableValidation(); profileValidator.enableValidation(); cardValidator.enableValidation();

const mestApi = new Api;
const userMe = mestApi.autorize();
// alert(`${userMe.about} / ${userMe.avatar} / ${userMe.cohort} / ${userMe._id}`)

function presetCardForm(){
  cardValidator.restoreForm();
}

function handleCardTrash(handleCardConfirm){
 // alert(`Trash in js: ${handleCardConfirm}`);
  confirmPopup.open(handleCardConfirm);
}

function handleCardLike (card, liken) {
  // alert(`Like in js: ${card.ClassName} / ${liken.ClassList}`);
  // alert(`Like pressed: ${liken.textContent} / ${card.getAttribute('class')} / ${liken.getAttribute('class').includes(constants.cardSettings.likenActiveClass)}`); // передча ссылок работает криво, без классов, только HTML-эл-ты (bind'ы не помогают: ни this, ни сам эл-т)
  if(liken.getAttribute('class').includes(constants.cardSettings.likenActiveClass)) {
    liken.textContent++;
  } else {
    liken.textContent--;
  }
}

function presetAvatarForm(){
  avatarValidator.restoreForm();
}

function presetProfileForm () {
  profileForm.elements.profilename.value = userInfo.getUserInfo().name;
  profileForm.elements.profilabout.value = userInfo.getUserInfo().about;
  profileValidator.restoreForm();
}

function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  /*userInfo.setUserInfo({ name: profileForm.elements.profilename.value
    , about: profileForm.elements.profilabout.value}
  );*/
  // const avatar_img = document.querySelector('.cousteau__image')
  const avatar_img = document.querySelector(constants.userAvatarSelector);
  // alert(`avatar close: ${avatar_img.alt} / ${document.forms.avataredit.elements.avatarlink.placeholder}`)
  avatar_img.src = document.forms.avataredit.elements.avatarlink.value
  avatarPopup.close();
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
    createCard({name: cardForm.elements.cardname.value, link: cardForm.elements.cardlink.value}
    , {cardSettings: constants.cardSettings, handleCardTrash, handleCardLike})
  );
  cardPopup.close();
}

function handleConfirmForm (evt) {
  evt.preventDefault();
  confirmPopup.close(true);
}

function createCard({name: cardCaption, link: cardAddress}, {cardSettings, handleCardTrash, handleCardLike}) {
  return new Card({name: cardCaption, link: cardAddress}
  , {cardSettings: cardSettings, cardTrashHandler: handleCardTrash, cardLikeHandler: handleCardLike}
  ).getCard();
}