import { observable, action, computed, toJS } from "mobx";
import authService from "../services/AuthService";
import AuthService from "../services/AuthService";
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";

export default class AuthStore {
  @observable token;
  @observable currentUser;
  @observable userData;

  @observable viewLoginModal = false;
  @observable viewSignInModal = false;

  @action
  login = async (email, password) => {
    try {
      const user = await authService.login(email, password);

      this.setCurrentUser(user);
      return this.getCurrentUser;
    } catch (err) {
      throw err;
    }
  };

  @action
  logOut = async () => {
    try {
      const res = await AuthService.logOut();
      if (res) {
        this.setCurrentUser(null);
        return true;
      }
    } catch (err) {
      throw err;
    }
  };

  @action
  getUserDataFromServer = async userName => {
    try {
      const user = await AuthService.getUserData(userName);
      this.setUserData(user);
    } catch (err) {
      throw err;
    }
  };

  @action
  setUserData = user => {
    this.userData = user;
  };
  @action
  toggleviewLoginModal = () => {
    this.viewLoginModal
      ? (this.viewLoginModal = false)
      : (this.viewLoginModal = true);
  };

  @action
  togglevSignInModal = () => {
    this.togglevSignInModal
      ? (this.togglevSignInModal = false)
      : (this.togglevSignInModal = true);
  };

  @action
  tryLogin = async () => {
    try {
      const user = await authService.tryLogin();
      this.setCurrentUser(user);
      return this.getCurrentUser;
    } catch (err) {
      throw err;
    }
  };

  @action
  register = async user => {
    const res = await authService.register(user);

    if (res) {
      this.setCurrentUser(res.data.data);
      return true;
    } else {
      return false;
    }
  };

  @action
  setCurrentUser = user => {
    this.currentUser = user;
  };
  @computed
  get getCurrentUser() {
    return toJS(this.currentUser) || null;
  }
  @computed
  get getUserData() {
    return toJS(this.userData) || null;
  }
}
