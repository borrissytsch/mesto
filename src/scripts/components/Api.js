export default class Api {
#serverLogin;
#serverToken;
#userDir;
constructor (loginData) {
  this.#serverLogin = (dir) => loginData.login (dir);
  this.#serverToken = loginData.token;
  this.#userDir = loginData.userDir;
}

  autorize(handler, dir = this.#userDir, request = 'GET') {
    return fetch(this.#serverLogin(dir), {method: request
      , headers: {authorization: this.#serverToken}
    }).then(res => {
        if (res.ok) return res.json();
        Promise.reject(`Api promise error: ${res.status}`);
    }).then((result) => 
        {if (handler) handler(result)}
    ).catch((err) => console.log(err))
  }

  getInitialCards(handler) {
    return this.autorize(handler, 'cards')
  }

  updateProfile(userData, handler, dir = this.#userDir, request = 'PATCH') {
    return fetch(this.#serverLogin(dir), {method: request
      , headers: {authorization: this.#serverToken
      , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(userData)
    }).then(res => {if (res.ok) return res.json(); Promise.reject(`Api promise error: ${res.status}`);})
      .then((result) => {if (handler) handler(result)}
    ).catch((err) => console.log(err))
  }

  updateAvatar(avatar, handler, dir = `${this.#userDir}/avatar`) {
    return this.updateProfile({avatar}, handler, dir);
  }

  addCard(cardData, handler, dir = 'cards', request = 'POST') {
    return this.updateProfile(cardData, handler, dir, request);
  }

  deleteCard(cardID, handler, dir = `cards/${cardID}`, request = 'DELETE') {
    return this.autorize(handler, dir, request)    
  }

  addLike(cardID, handler, dir = `cards/${cardID}/likes`, request = 'PUT') {
    return this.autorize(handler, dir, request)    
  }

  deleteLike(cardID, handler, dir = `cards/${cardID}/likes`, request = 'DELETE') {
    return this.autorize(handler, dir, request)
  }
}