import { observable, action, computed, toJS } from "mobx";
import MatchingService from "../services/MatchingService";

export default class MatchesStore {
  constructor(authStore) {
    this.authStore = authStore;
  }

  authStore;

  @observable
  match;
  @observable
  allMatchingProducts = observable([]);
  @observable
  userMatching = observable([]);

  @action
  enterProductsForMatch = async (productsIds, action) => {
    try {
      const res = await MatchingService.enterProductsForMatch(
        this.authStore.getCurrentUser._id,
        action,
        productsIds
      );
      if (!res) return null;
      else {
        await this.authStore.tryLogin();
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  @action
  setMatch = match => {
    this.match = match;
  };

  @action
  checkMatching = async userName => {
    console.log("in store");
    try {
      const match = await MatchingService.checkMatching(userName);
      if (match) {
        this.setMatch(match);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  };

  @computed
  get getMatch() {
    return toJS(this.match) || [];
  }
}
