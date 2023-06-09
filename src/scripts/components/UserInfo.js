export default class UserInfo {
  #userName; #userAbout; #userAvatar;
  #userID;
  #userCohort;
  constructor ({name, about, avatar, id, cohort}) {
    this.#userName = document.querySelector(name);
    this.#userAbout = document.querySelector(about);
    this.#userAvatar = document.querySelector(avatar);
    this.#userID = id;
    this.#userCohort = cohort;
  }
  
  getUserInfo() {
    return {name: this.#userName.textContent, about: this.#userAbout.textContent, avatar: this.#userAvatar.src
      , id: this.#userID, cohort: this.#userCohort
    }
  }

  setUserProfile({name, about}) {
    this.#userName.textContent = name; this.#userAbout.textContent = about;
  }

  setUserInfo({name, about, avatar, id, cohort}, notNull_flag = false) {
    if(!notNull_flag || name) this.#userName.textContent = name;
    if(!notNull_flag || about) this.#userAbout.textContent = about;
    if(!notNull_flag || avatar) this.#userAvatar.src = avatar;
    if(!notNull_flag || id) this.#userID = id;
    if(!notNull_flag || cohort) this.#userCohort = cohort;
  }
}