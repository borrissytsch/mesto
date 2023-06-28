export default class Card {
  #cardName; #cardLink; #cardID; #ownerID; #cardLikes;
  #cardTemplate;
  #cardElement;
  #cardFields;
  #trashActiveClass; #cardLikeClass; #likenActiveClass;
  #handleCardClick; #handleTrashClick; #handleLikeClick; #handleTrashVisibility;
  constructor (cardData, {cardSettings, cardTrashHandler, cardLikeHandler, сardClickHandler, trashVisibilityHandler}) {
    this.#cardName = cardData.name;
    this.#cardLink = cardData.link;
    this.#cardID = cardData._id;
    this.#ownerID = cardData.owner._id;
    this.#cardTemplate = document.querySelector(cardSettings.templateSelector);
    this.#cardElement = this.#createElement(cardSettings.containerSelector);
    this.#cardFields = { image: this.#cardElement.querySelector(cardSettings.imageSelector)
      , icon: this.#cardElement.querySelector(cardSettings.iconSelector)
      , liken: this.#cardElement.querySelector(cardSettings.likenSelector)
      , title: this.#cardElement.querySelector(cardSettings.titleSelector)
      , trash: this.#cardElement.querySelector(cardSettings.trashSelector)
    }
    this.#trashActiveClass = cardSettings.trashActiveClass
    this.#cardLikeClass = cardSettings.likeIconClass;
    this.#likenActiveClass = cardSettings.likenActiveClass;
    this.#cardFields.image.alt = this.#cardName;
    this.#cardFields.image.src = this.#cardLink;
    this.#cardFields.title.textContent = this.#cardName;
    this.#handleTrashClick = cardTrashHandler;
    this.#handleLikeClick = cardLikeHandler;
    this.#handleCardClick = сardClickHandler;
    this.#handleTrashVisibility = trashVisibilityHandler;
    if (this.#handleTrashVisibility(this.#ownerID)) this.#cardFields.trash.classList.add(this.#trashActiveClass)
    if (cardData.likes) {this.#cardLikes = cardData.likes} else {this.#cardLikes = []}
    if (this.#cardLikes.length > 0) {
      this.#cardFields.liken.textContent = this.#cardLikes.length;
      this.#cardFields.liken.classList.add(this.#likenActiveClass);
    }
    this.#addCardListeners();
  }
  
  #addCardListeners() {
    this.#cardFields.icon.addEventListener('click', () => {
      this.#cardFields.icon.classList.toggle(this.#cardLikeClass);
      this.#handleLikeClick (this.#cardElement, this.#cardID, this.#cardFields.liken);
    });
    if (this.#handleTrashVisibility(this.#ownerID)) {
      this.#cardFields.trash.addEventListener('click', 
        () => this.#handleTrashClick(this.#cardElement, this.#cardID)
      );
    }
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

  getCardInfo() {
    return {name: this.#cardName, link: this.#cardLink, id: this.#cardID, owner: this.#ownerID, likes: this.#cardLikes
      , element: this.#cardElement
      , fields: {image: this.#cardFields.image
        , icon: this.#cardFields.icon
        , liken: this.#cardFields.liken
        , title: this.#cardFields.title
        , trash: this.#cardFields.trash
      }
    };     
  }
}