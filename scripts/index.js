const popups = document.querySelectorAll('.popup');
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
const card2add_sample = document.querySelector('.card-template').content.querySelector('.table__cell');
const forms2validate = document.querySelectorAll('.popup__items');

initialCards.forEach((card) => {cards_container.append(addCard(card))});
profile_edit_button.addEventListener('click', editProfile);
card_add_button.addEventListener('click', renderCard);
document.forms.profiledit_frm.addEventListener('submit', handleEditFormSubmit);
document.forms.cardadd_frm.addEventListener('submit', handleAddCardForm);
popups.forEach(popup2close => {addEventListener('click',
  evt => {if(evt.target === popup2close) closePopup(popup2close)}
)});
popups.forEach(popup2close => {addEventListener('keydown',
  evt => {if(evt.key === "Escape") closePopup(popup2close)}
)});
buttons_close_popup.forEach(button => {const popup2close = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(popup2close))
});
forms2validate.forEach(form2validate => {const submit_button = form2validate.querySelector('.popup__save')
  if (!form2validate.hasAttribute('novalidate')) form2validate.setAttribute('novalidate', true);
  form2validate.querySelectorAll('.popup__input').forEach(input_field => {
    if (input_field.classList.contains('popup__input_validated')) input_field.classList.toggle('popup__input_validated');
    input_field.addEventListener('input', evt => {evt.preventDefault;
      performValidation({form: form2validate, input: evt.target, button: submit_button})
    });
}) });

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

function renderCard(){
  if (isFormInvalid (document.forms.cardadd_frm)) disableButton(cardPopup.querySelector('.popup__save'))
  openPopup(cardPopup)
}

function editProfile () {
  const thisForm = document.forms.profiledit_frm;
  thisForm.elements.profiledit_inp_name.value = profile_name.textContent;
  thisForm.elements.profiledit_inp_about.value = profile_about.textContent;
  if (isFormInvalid (thisForm)) disableButton(profilePopup.querySelector('.popup__save'))
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
  if (popup.classList.contains('popup_type_form')) {
    let thisForm = document.forms.profiledit_frm;
    if (popup.classList.contains('popup_type_profile')) {
      if (isFormInvalid(thisForm)) hideErrorFields(thisForm)
      thisForm.elements.profiledit_inp_name.value = profile_name.textContent;
      thisForm.elements.profiledit_inp_about.value = profile_about.textContent;
    } else {
      thisForm = document.forms.cardadd_frm;
      if (isFormInvalid(thisForm)) hideErrorFields(thisForm)
      clearForm(thisForm);
    }
  }
  popup.classList.remove('popup_opened');
}

function clearForm (form, fillString = '') {
  form.querySelectorAll('.popup__input').forEach(field => {field.value = fillString})
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
  const thisForm = document.forms.cardadd_frm;
  cards_container.prepend(addCard({name: thisForm.elements.cardadd_inp_name.value, link: thisForm.elements.cardadd_inp_link.value}));
  clearForm(thisForm);
  closePopup(cardPopup);
}