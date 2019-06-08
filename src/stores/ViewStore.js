import { observable, computed, toJS, action } from "mobx";

export default class ViewStore {
  @observable appLoadingBoolean = true;
  @observable appLoadingText;

  @observable
  blocking = false;

  @action
  setappLoadingBoolean = loadded => {
    this.appLoadingBoolean = loadded;
  };

  @action toggleappLoadingBoolean() {
    if (this.appLoadingBoolean) {
      this.appLoadingBoolean = false;
    } else {
      this.appLoadingBoolean = true;
    }
  }

  @computed
  get getappLoadingBoolean() {
    return toJS(this.appLoadingBoolean);
  }
}
