import { observable, action, computed, toJS } from "mobx";
import adminPanelService from "../services/AdminPanelService";

export default class AdminPanelStore {
  @observable viewUsers;
  @observable ViewProducts;
  @observable viewOrders;
  @observable allUsers = observable([]);

  @action toggleViewUsers() {
    if (this.viewUsers) {
      this.viewUsers = false;
    } else {
      this.viewUsers = true;
    }
    this.ViewProducts = false;
    this.viewOrders = false;
  }

  @action toggleViewProducts() {
    if (this.ViewProducts) {
      this.ViewProducts = false;
    } else {
      this.ViewProducts = true;
    }
    this.viewOrders = false;
    this.viewUsers = false;
  }

  @action toggleViewOrders() {
    if (this.viewOrders) {
      this.viewOrders = false;
    } else {
      this.viewOrders = true;
    }
    this.ViewProducts = false;
    this.viewUsers = false;
  }

  @action
  getAllUsersAPI = async () => {
    const users = await adminPanelService.getAllUsers();
    this.allUsers.replace(users);
  };

  @computed
  get getAllUsers() {
    if (this.allUsers) {
      return toJS(this.allUsers);
    }
  }
}
