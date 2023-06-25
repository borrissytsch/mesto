class Card {
  #cardName;
  #cardLink;
  #cardTemplate;
  #cardElement;
  #cardFields;
  #cardLikeClass;
  #likenActiveClass; // added liken active class property
  #handleCardClick;
  #handleTrashClick;
  #handleLikeClick;
  constructor (cardData, {cardSettings, cardTrashHandler, cardLikeHandler}) { // add like handler
    this.#cardName = cardData.name;
    this.#cardLink = cardData.link;
    this.#cardTemplate = document.querySelector(cardSettings.templateSelector);
    this.#cardElement = this.#createElement(cardSettings.containerSelector);
    this.#cardFields = { image: this.#cardElement.querySelector(cardSettings.imageSelector)
      , icon: this.#cardElement.querySelector(cardSettings.iconSelector)
      , liken: this.#cardElement.querySelector(cardSettings.likenSelector) // added liken field
      , title: this.#cardElement.querySelector(cardSettings.titleSelector)
      , trash: this.#cardElement.querySelector(cardSettings.trashSelector)
    }
    this.#cardLikeClass = cardSettings.likeIconClass;
    this.#likenActiveClass = cardSettings.likenActiveClass; // added liken active class
    this.#handleCardClick = cardSettings.handleCardClick;
    this.#cardFields.image.alt = this.#cardName;
    this.#cardFields.image.src = this.#cardLink;
    this.#cardFields.title.textContent = this.#cardName;
    this.#handleTrashClick = cardTrashHandler; // open confirm form in index.js
    this.#handleLikeClick = cardLikeHandler;   // open like handler in index.js
    this.#addCardListeners();
  }
  
  #addCardListeners() {
    this.#cardFields.icon.addEventListener('click', () => {
      this.#cardFields.icon.classList.toggle(this.#cardLikeClass);
      this.#cardFields.liken.classList.toggle(this.#likenActiveClass); // added toggle linken active
      // alert(`${this.#cardElement.classList} / ${this.#cardFields.liken.classList}`)
      this.#handleLikeClick (this.#cardElement, this.#cardFields.liken);
    });
    this.#cardFields.trash.addEventListener('click', 
      () => this.#handleTrashClick(() => {this.#cardElement.remove(); this.#cardElement = null}) 
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