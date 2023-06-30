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
const cardsList = new Section( constants.cardContainerSelector
  , (card, container) => {container.append(createCard(card
  , {cardSettings: constants.cardSettings, handleCardTrash, handleCardLike}))}
);

const avatarValidator = new FormValidator(avatarForm, constants.validationSettings);
const profileValidator = new FormValidator(profileForm, constants.validationSettings);
const cardValidator = new FormValidator(cardForm, constants.validationSettings);

buttonOpenAvatarEditForm.addEventListener('click', () => avatarPopup.open(presetAvatarForm));
buttonOpenEditProfileForm.addEventListener('click', () => profilePopup.open(presetProfileForm));
buttonOpenAddCardForm.addEventListener('click', () => cardPopup.open(presetCardForm));
avatarValidator.enableValidation(); profileValidator.enableValidation(); cardValidator.enableValidation();

const mestApi = new Api(constants.srvLoginData);
Promise.all([mestApi.autorize(), mestApi.getInitialCards()]).then(result => {
  userInfo.setUserInfo({name: result[0].name, about: result[0].about, avatar: result[0].avatar
    , id: result[0]._id, cohort: result[0].cohort
  });
  cardsList.renderItems(result[1]);
}).catch((err) => console.log(err));

function presetCardForm(){
  cardValidator.restoreForm();
}

function handleCardTrash(cardElement, cardID) {
  confirmPopup.open(cardElement, cardID);
}

function handleConfirmForm () {
  confirmPopup.close(clickTrashApiHandler);
}

function clickTrashApiHandler (cardID, card2delete) {
  mestApi.deleteCard(cardID).then(
    (result, card = card2delete) => card.removeCard()
  ).catch((err) => console.log(err))
}

//function handleCardLike (card, cardID, liken) {
function handleCardLike (card) {
  if(card.isLiked()) {
    mestApi.deleteLike(card.getCardInfo().id).then(result => {
      //Object.keys(result.likes[0]).forEach(key => alert(`${result.likes[0]} ${key}`))
      card.updateLikes(result.likes)
    }).catch((err) => console.log(err))
  } else {
    mestApi.addLike(card.getCardInfo().id).then(result => {
      //Object.keys(result.likes[0]).forEach(key => alert(`${result.likes[0]} ${key}`))
      card.updateLikes(result.likes)
    }).catch((err) => console.log(err))
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

function handleAvatarFormSubmit (inputValues) {
  const previousButtonCaption = setElementCaption(avatarSubmitButton);
  mestApi.updateAvatar(inputValues.avatarlink).then( result => {
    userInfo.setUserInfo({name: result.name, about: result.about, avatar: result.avatar
      , id: result._id, cohort: result.cohort}
    );
    avtarImage.src = userInfo.getUserInfo().avatar;
    avatarPopup.close();
  }
  ).catch(err => {alert(`Avatar err: ${err}`); console.log(err)}
  ).finally(setElementCaption(avatarSubmitButton, previousButtonCaption));
}

function handleEditFormSubmit (inputValues) {
  const previousButtonCaption = setElementCaption(profileSubmitButton);
  mestApi.updateProfile({name: inputValues.profilename, about: inputValues.profilabout}).then
    (result => {userInfo.setUserInfo({name: result.name, about: result.about, avatar: result.avatar
    , id: result._id, cohort: result.cohort});
    profilePopup.close()}
  ).catch((err) => console.log(err)
  ).finally(setElementCaption(profileSubmitButton, previousButtonCaption));
}

function handleAddCardForm (inputValues) {
  const previousButtonCaption = setElementCaption(cardSubmitButton);
  mestApi.addCard({name: inputValues.cardname, link: inputValues.cardlink}).then(
    result => { cardsList.addItem({name: result.name, link: result.link, _id: result._id
      , owner: result.owner, likes: result.likes} , {cardSettings: constants.cardSettings
      , cardTrashHandler: handleCardTrash, cardLikeHandler: handleCardLike}
    );
    cardPopup.close();
  }).catch((err) => console.log(err)
  ).finally(setElementCaption(cardSubmitButton, previousButtonCaption));
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