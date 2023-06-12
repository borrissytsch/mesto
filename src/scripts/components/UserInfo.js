export default class UserInfo {
  #userName;
  #userAbout;
  constructor ({name, about}) {
    this.#userName = document.querySelector(name);
    this.#userAbout = document.querySelector(about);
  }
  
  getUserInfo() {
    return {name: this.#userName.textContent, about: this.#userAbout.textContent};
  }

  setUserInfo({name, about}) {
    this.#userName.textContent = name; this.#userAbout.textContent = about;
  }
}