import { observable, computed, toJS, action } from "mobx";

export default class ViewStore {
  @observable
  loader = false;

  @observable
  blocking = false;

  @action
  setLoader = loadded => {
    this.loader = loadded;
  };

  @action
  setBlocking = value => {
    this.blocking = value;
  };

  @computed
  get getBlocking() {
    return toJS(this.blocking);
  }

  @computed
  get getLoader() {
    return toJS(this.loader);
  }
}
