/* External config data */
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

/* Internal classes' config vars */
export const profileSelector = '.popup.popup_type_profile';
export const cardSelector = '.popup.popup_type_card';
export const formSelector = '.popup__items';
export const inputSelector = '.popup__input';
export const pictureSelector = '.popup.popup_type_picture';
export const pictureImageSelector = '.popup__image';
export const pictureCaptionSelector = '.popup__caption';
export const buttonCloseSelector = '.popup__close';
export const userNameSelector = '.cousteau__title';
export const userAboutSelector = '.cousteau__subtitle';
export const cardContainerSelector = '.table';
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
  , titleSelector: '.table__title'
  , trashSelector: '.table__trash'
  , likeIconClass: 'table__icon_like'
};
