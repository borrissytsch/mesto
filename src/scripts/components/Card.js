class Card {
  #cardName;
  #cardLink;
  #cardTemplate;
  #cardElement;
  #cardFields;
  #cardLikeClass;
  #handleCardClick
  constructor (cardData, cardSettings) {
    this.#cardName = cardData.name;
    this.#cardLink = cardData.link;
    this.#cardTemplate = document.querySelector(cardSettings.templateSelector);
    this.#cardElement = this.#createElement(cardSettings.containerSelector);
    this.#cardFields = { image: this.#cardElement.querySelector(cardSettings.imageSelector)
      , icon: this.#cardElement.querySelector(cardSettings.iconSelector)
      , title: this.#cardElement.querySelector(cardSettings.titleSelector)
      , trash: this.#cardElement.querySelector(cardSettings.trashSelector)
    }
    this.#cardLikeClass = cardSettings.likeIconClass;
    this.#handleCardClick = cardSettings.handleCardClick;
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
      () => {this.#cardElement.remove(); this.#cardElement = null}
    );
    this.#cardFields.image.addEventListener('click', 
      () => {this.#handleCardClick (this.#cardFields.image)}
    );
  }

  #createElement(containerSelector, contentsCopy_flag = true) {
    return this.#cardTemplate.content.querySelector(containerSelector).cloneNode(contentsCopy_flag);
  }

  getCard() {
    return this.#cardElement;
  }
}

export default Card;