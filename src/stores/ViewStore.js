import { observable, computed, toJS, action } from "mobx";

export default class ViewStore {
  @observable
  loader = false;

  @action
  setLoader = loadded => {
    this.loader = loadded;
  };

  @computed
  get getLoader() {
    return toJS(this.loader);
  }
}
