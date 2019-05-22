import { observable, action, computed, toJS } from "mobx";

export default class AdminPanelStore {
  @observable viewUsers;
  @observable ViewProducts;
  @observable viewOrders;

  @action toggleViewUsers() {
    console.log("aaaaaaaa");
    if (this.viewUsers) {
      this.viewUsers = false;
    } else {
      this.viewUsers = true;
    }
    this.ViewProducts = false;
    this.viewOrders = false;
  }

  @action toggleViewProducts() {
    console.log("bbbbbbbbb");
    if (this.ViewProducts) {
      this.ViewProducts = false;
    } else {
      this.ViewProducts = true;
    }
    this.viewOrders = false;
    this.viewUsers = false;
  }

  @action toggleViewOrders() {
    console.log("cccccccc");
    if (this.viewOrders) {
      this.viewOrders = false;
    } else {
      this.viewOrders = true;
    }
    this.ViewProducts = false;
    this.viewUsers = false;
  }
}
