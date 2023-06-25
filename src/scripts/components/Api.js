import { srvLoginData } from "../utils/constants.js";
export default class Api {
  #serverLogin;
  #serverToken;
    constructor (loginData = srvLoginData) {
    this.#serverLogin = (dir) => loginData.login (69, dir);
    this.#serverToken = loginData.token;
  }

  autorize(dir = 'users/me'){
    fetch(this.#serverLogin(dir), {
      headers: {
        authorization: this.#serverToken
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        // alert(`result: ${result} ${result.name}`);
        return result;
      });
  }
}