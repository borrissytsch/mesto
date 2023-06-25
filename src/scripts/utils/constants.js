/* External config data: before webpack building add export prefix to all consts */
 export const initialCards = [{
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

/* Server data config */
export const srvLoginData = {login: (cohort, dir) =>`https://mesto.nomoreparties.co/v1/cohort-${cohort}/${dir}`, token: '2820c2c8-dbab-4884-b269-611968f0327e'};

/* Internal classes' config vars */
export const avatarSelector = '.popup.popup_type_avatar';
export const profileSelector = '.popup.popup_type_profile';
export const cardSelector = '.popup.popup_type_card';
export const confirmSelector = '.popup.popup_type_confirm';
export const formSelector = '.popup__items';
export const inputSelector = '.popup__input';
export const pictureSelector = '.popup.popup_type_picture';
export const pictureImageSelector = '.popup__image';
export const pictureCaptionSelector = '.popup__caption';
export const buttonCloseSelector = '.popup__close';
export const userNameSelector = '.cousteau__title';
export const userAboutSelector = '.cousteau__subtitle';
export const userAvatarSelector = '.cousteau__image';
export const cardContainerSelector = '.table';
export const avatarEditButtonSelector = '.cousteau__avedit';
export const profileEditButtonSelector = '.cousteau__box';
export const cardAddButtonSelector = '.cousteau__button';
export const validationSettings = { inputSelector: '.popup__input'
  , submitButtonSelector: '.popup__save'
  , errorMsgSelector: '.popup__error-msg_type_'
  , inactiveButtonClass: 'popup__save_disabled'
  , inputErrorClass: 'popup__input_misfilled'
  , errorClass: 'popup__error-msg_visible'
};
export const cardSettings = {templateSelector: '.card-template'
  , containerSelector: '.table__cell'
  , imageSelector: '.table__image'
  , iconSelector: '.table__icon'
  , likenSelector: '.table__liken' // added liken selector
  , titleSelector: '.table__title'
  , trashSelector: '.table__trash'
  , likeIconClass: 'table__icon_like'
  , likenActiveClass: 'table__liken_active' // added liken active class
};