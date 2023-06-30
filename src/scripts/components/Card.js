export default class Card {
  //#cardName; #cardLink; #cardID; #ownerID; #cardLikes;
  //#cardTemplate;
  //#cardElement;
  //#cardFields;
  //#trashActiveClass; #cardLikeClass; #likenActiveClass;
  #handleCardClick; #handleTrashClick; #handleLikeClick; #handleTrashVisibility;
  constructor (cardData, {cardSettings, cardTrashHandler, cardLikeHandler, сardClickHandler, trashVisibilityHandler}) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._cardID = cardData._id;
    this._ownerID = cardData.owner._id;
    this._cardTemplate = document.querySelector(cardSettings.templateSelector);
    this._cardElement = this.#createElement(cardSettings.containerSelector);
    this._cardFields = { image: this._cardElement.querySelector(cardSettings.imageSelector)
      , icon: this._cardElement.querySelector(cardSettings.iconSelector)
      , liken: this._cardElement.querySelector(cardSettings.likenSelector)
      , title: this._cardElement.querySelector(cardSettings.titleSelector)
      , trash: this._cardElement.querySelector(cardSettings.trashSelector)
    }
    this._trashActiveClass = cardSettings.trashActiveClass
    this._cardLikeClass = cardSettings.likeIconClass;
    this._likenActiveClass = cardSettings.likenActiveClass;
    this._cardFields.image.alt = this._cardName;
    this._cardFields.image.src = this._cardLink;
    this._cardFields.title.textContent = this._cardName;
    this._handleTrashClick = cardTrashHandler;
    this._handleLikeClick = cardLikeHandler;
    this._handleCardClick = сardClickHandler;
    this._handleTrashVisibility = trashVisibilityHandler;
    if (this._handleTrashVisibility(this._ownerID)) this._cardFields.trash.classList.add(this._trashActiveClass)
    if (cardData.likes) {this._cardLikes = cardData.likes} else {this._cardLikes = []}
    this._updateLikesView(this._handleLikeClick (this, true))
    this.#addCardListeners();
  }
  
  #addCardListeners() {
    this._cardFields.icon.addEventListener('click', () => {
      this._handleLikeClick (this);
    });
    if (this._handleTrashVisibility(this._ownerID)) {
      this._cardFields.trash.addEventListener('click', 
        () => this._handleTrashClick(this, this._cardID)
      );
    }
    this._cardFields.image.addEventListener('click', 
      () => {this._handleCardClick ({src: this.getCardInfo().link, alt: this.getCardInfo().name})}
    );
  }

  _updateLikesView(isLiked) {
    this._cardFields.liken.textContent = this._cardLikes.length;
    this._cardFields.icon.classList.toggle(this._cardLikeClass, isLiked);
    this._cardFields.liken.classList.toggle(this._likenActiveClass, this._cardLikes.length > 0);
  }

  updateLikes(likes, isLiked) {
    this._cardLikes = likes;
    this._updateLikesView(isLiked)
  }

  removeCard(){
    this._cardElement.remove(); this._cardElement = null;
  }

  #createElement(containerSelector, contentsCopy_flag = true) {
    return this._cardTemplate.content.querySelector(containerSelector).cloneNode(contentsCopy_flag);
  }

  getCard() {
    return this._cardElement;
  }

  getCardInfo() {
    return {name: this._cardName, link: this._cardLink, id: this._cardID, owner: this._ownerID, likes: this._cardLikes
      , element: this._cardElement
      , fields: {image: this._cardFields.image
        , icon: this._cardFields.icon
        , liken: this._cardFields.liken
        , title: this._cardFields.title
        , trash: this._cardFields.trash
      }
    };     
  }
}