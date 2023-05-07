const profile_edit_button = document.querySelector('.cousteau__box');
const card_add_button = document.querySelector('.cousteau__button');
const profile_name = document.querySelector('.cousteau__title');
const profile_about = document.querySelector('.cousteau__subtitle');
const profilePopup = document.querySelector('.popup.popup_type_profile');
const cardPopup = document.querySelector('.popup.popup_type_card');
const picturePopup = document.querySelector('.popup.popup_type_picture');
const pictureImage = picturePopup.querySelector('.popup__image');
const pictureCaption = picturePopup.querySelector('.popup__caption');
const cards_container = document.querySelector('.table');
const card2add_sample = document.querySelector('.card-template').content.querySelector('.table__cell');

initialCards.forEach((card) => {cards_container.append(addCard(card))});
profile_edit_button.addEventListener('click', editProfile);
card_add_button.addEventListener('click', () => openPopup(cardPopup));
profilePopup.querySelector('.popup__close_type_profile-edit').addEventListener('click', () => closePopup(profilePopup));
cardPopup.querySelector('.popup__close_type_card-add').addEventListener('click', () => closePopup(cardPopup));
picturePopup.querySelector('.popup__close_type_picture').addEventListener('click', () => closePopup(picturePopup));
document.forms.profiledit_frm.addEventListener('submit', handleEditFormSubmit);
document.forms.cardadd_frm.addEventListener('submit', handleAddCardForm);

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

function editProfile () {
  document.forms.profiledit_frm.elements.profiledit_inp_name.value = profile_name.textContent;
  document.forms.profiledit_frm.elements.profiledit_inp_about.value = profile_about.textContent;
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleEditFormSubmit (evt) {
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  profile_name.textContent = document.forms.profiledit_frm.elements.profiledit_inp_name.value;
  profile_about.textContent = document.forms.profiledit_frm.elements.profiledit_inp_about.value;
  closePopup(profilePopup);
}

function handleAddCardForm (evt) {
  evt.preventDefault();
  const thisFormElements = document.forms.cardadd_frm.elements;
  cards_container.prepend(addCard({name: thisFormElements.cardadd_inp_name.value, link: thisFormElements.cardadd_inp_link.value}));
  thisFormElements.cardadd_inp_name.value = ''; thisFormElements.cardadd_inp_link.value = '';
  closePopup(cardPopup);
}