import { observable, action } from "mobx";
import MatchingService from "../services/MatchingService";

export default class MatchesStore {
  constructor(authStore) {
    this.authStore = authStore;
  }

  authStore;

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
      else return res;
    } catch (err) {
      throw err;
    }
  };
}