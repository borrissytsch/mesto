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

const srvCardLimit = 36; let cardsList = null;
const buttonOpenAvatarEditForm = document.querySelector(constants.avatarEditButtonSelector);
const buttonOpenEditProfileForm = document.querySelector(constants.profileEditButtonSelector);
const buttonOpenAddCardForm = document.querySelector(constants.cardAddButtonSelector);
const avatarForm = document.querySelector(constants.avatarSelector).querySelector(constants.formSelector);
const profileForm = document.querySelector(constants.profileSelector).querySelector(constants.formSelector);
const cardForm = document.querySelector(constants.cardSelector).querySelector(constants.formSelector);
const avtarImage = document.querySelector(constants.userAvatarSelector);
const avatarSubmitButton = avatarForm.querySelector(constants.buttonSubmitSelector);
const profileSubmitButton = profileForm.querySelector(constants.buttonSubmitSelector);
const cardSubmitButton = cardForm.querySelector(constants.buttonSubmitSelector);

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

const userInfo = new UserInfo({name: constants.userNameSelector, about: constants.userAboutSelector
  , avatar: constants.userAvatarSelector}, true
);

const avatarValidator = new FormValidator(avatarForm, constants.validationSettings);
const profileValidator = new FormValidator(profileForm, constants.validationSettings);
const cardValidator = new FormValidator(cardForm, constants.validationSettings);

buttonOpenAvatarEditForm.addEventListener('click', () => avatarPopup.open(presetAvatarForm));
buttonOpenEditProfileForm.addEventListener('click', () => profilePopup.open(presetProfileForm));
buttonOpenAddCardForm.addEventListener('click', () => cardPopup.open(presetCardForm));
avatarValidator.enableValidation(); profileValidator.enableValidation(); cardValidator.enableValidation();

const mestApi = new Api(constants.srvLoginData);
const userMe = mestApi.autorize((result, user = userInfo) => {
  user.setUserInfo({name: result.name, about: result.about, avatar: result.avatar, id: result._id, cohort: result.cohort})
});

mestApi.getInitialCards(getCardsApiHandler);

function getCardsApiHandler(result) {
  const srvCards = []; let i = 0;
  result.forEach(item => {if (i++ < srvCardLimit || srvCardLimit == 0) srvCards.push(item)});
  cardsList = new Section({ items: srvCards
    , renderer: (card, container) => {container.append(createCard(card
    , {cardSettings: constants.cardSettings, handleCardTrash, handleCardLike}))}}
    , constants.cardContainerSelector
  ).renderItems()
}

function presetCardForm(){
  cardValidator.restoreForm();
}

function handleCardTrash(cardElement, cardID) {
  confirmPopup.open(cardElement, cardID);
}

function handleConfirmForm (evt) {
  evt.preventDefault();
  confirmPopup.close(clickTrashApiHandler);
}

function clickTrashApiHandler (cardID, cardElement) {
  mestApi.deleteCard(cardID, (result, element = cardElement) => {element.remove(); element = null})
}

function handleCardLike (card, cardID, liken) {
  const likenBeforeClick = liken.textContent;
  if(card.querySelector(constants.cardSettings.iconSelector).classList.contains(constants.cardSettings.likeIconClass)) {
    mestApi.addLike(cardID, (result => {liken.textContent = result.likes.length;
      if (likenBeforeClick == 0 & liken.textContent > 0) liken.classList.toggle(constants.cardSettings.likenActiveClass);
    }))
  } else {
    mestApi.deleteLike(cardID, (result => {liken.textContent = result.likes.length;
      if (likenBeforeClick > 0 & liken.textContent == 0) liken.classList.toggle(constants.cardSettings.likenActiveClass);
    }))
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
  const previousButtonCaption = setElementCaption(avatarSubmitButton);
  mestApi.updateAvatar(document.forms.avataredit.elements.avatarlink.value
    , (result, user = userInfo) => updateAvatarApiHandler);
  avatarPopup.close();
}

function updateAvatarApiHandler(result, user) {
  user.setUserInfo(
    {name: result.name, about: result.about, avatar: result.avatar, id: result._id, cohort: result.cohort}
  );
  avtarImage.src = user.getUserInfo().avatar;
  setElementCaption(avatarSubmitButton, previousButtonCaption)
}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  const previousButtonCaption = setElementCaption(profileSubmitButton);
  mestApi.updateProfile({name: profileForm.elements.profilename.value, about: profileForm.elements.profilabout.value}
    , (result, user = userInfo) => editProfileApiHandler);
  profilePopup.close();
}

function editProfileApiHandler(result, user) {
  user.setUserInfo(
    {name: result.name, about: result.about, avatar: result.avatar, id: result._id, cohort: result.cohort});
  setElementCaption(profileSubmitButton, previousButtonCaption);
}

function handleAddCardForm (evt) {
  evt.preventDefault();
  const previousButtonCaption = setElementCaption(cardSubmitButton);
  mestApi.addCard({name: cardForm.elements.cardname.value, link: cardForm.elements.cardlink.value}
    , (result, renderer = cardsList) => addCardApiHandler);
  cardPopup.close();
}

function addCardApiHandler(result, renderer){
  renderer.addItem({name: result.name, link: result.link, _id: result._id
    , owner: result.owner, likes: result.likes} , {cardSettings: constants.cardSettings
    , cardTrashHandler: handleCardTrash, cardLikeHandler: handleCardLike, сardClickHandler: handleCardClick
    , handleTrashVisibility}
  );
  setElementCaption(cardSubmitButton, previousButtonCaption);
}

function setElementCaption(element, caption = constants.msgSubmitButtonWait, savePrevious_flag = true) {
  let retValue = caption;
  if (savePrevious_flag) retValue = element.textContent;
  element.textContent = caption;
  return retValue;
}

function createCard({name: cardCaption, link: cardAddress
  , _id: cardID = null, owner: ownerID = {_id: userInfo.getUserInfo().id}, likes: cardLikes = []}
  , {cardSettings, handleCardTrash, handleCardLike
  , handleCardClick = picturePopup.open.bind(picturePopup)
  , handleTrashVisibility = (cardOwnerID) => cardOwnerID == userInfo.getUserInfo().id}) {
  return new Card({name: cardCaption, link: cardAddress, _id: cardID, owner: ownerID, likes: cardLikes}
    , {cardSettings: cardSettings 
    , cardTrashHandler: handleCardTrash, cardLikeHandler: handleCardLike, сardClickHandler: handleCardClick
    , trashVisibilityHandler: handleTrashVisibility
  }).getCard();
}