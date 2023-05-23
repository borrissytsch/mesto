class Card {
  #cardName;
  #cardLink;
  #cardElement;
  #cardFields;
  #cardLikeClass;
  #openPopup;
  #popupFields;
  constructor (cardData, cardSettings) {
    this.#cardName = cardData.name;
    this.#cardLink = cardData.link;
    this.#cardElement = document.querySelector(cardSettings.templateSelector).content.querySelector(cardSettings.containerSelector).cloneNode(true);
    this.#cardFields = { image: this.#cardElement.querySelector(cardSettings.imageSelector)
      , icon: this.#cardElement.querySelector(cardSettings.iconSelector)
      , title: this.#cardElement.querySelector(cardSettings.titleSelector)
      , trash: this.#cardElement.querySelector(cardSettings.trashSelector)
    }
    this.#cardLikeClass = cardSettings.likeIconClass;
    this.#openPopup = cardSettings.openPopupMethod;
    this.#popupFields = { popup: cardSettings.picturePopupRef
      , image: cardSettings.pictureImageRef
      , caption: cardSettings.pictureCaptionRef
    }
    this.#cardFields.image.alt = this.#cardName;
    this.#cardFields.image.src = this.#cardLink;
    this.#cardFields.title.textContent = this.#cardName;
    this.#addCardListeners();
  }
  
  #addCardListeners() {
    this.#cardFields.icon.addEventListener('click', 
      () => {this.#cardFields.icon.classList.toggle(this.#cardLikeClass)}
    );
    this.#cardFields.trash.addEventListener('click', 
      () => {this.#cardElement.remove()}
    );
    this.#cardFields.image.addEventListener('click', 
      () => {this.#openPicture (this.#cardFields.image)}
    );
  }

  #openPicture (picture) {
    this.#popupFields.image.src = picture.src;
    this.#popupFields.image.alt = picture.alt;
    this.#popupFields.caption.textContent = picture.alt;
    this.#openPopup (this.#popupFields.popup);
  }

  getCard() {
    return this.#cardElement;
  }
}

export default Card;