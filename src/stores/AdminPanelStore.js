import { observable, action, computed, toJS } from "mobx";
import adminPanelService from "../services/AdminPanelService";

export default class AdminPanelStore {
  @observable viewUsers;
  @observable ViewProducts;
  @observable viewOrders;
  @observable viewStatistics;
  @observable viewStatisticsByCategory;
  @observable allUsers = observable([]);
  @observable allOrders = observable([]);
  @observable allProducts = observable([]);
  @observable statsByCategoryObject = observable([]);
  @observable statsByMonthObject = observable([]);

  @action toggleViewUsers() {
    if (this.viewUsers) {
      this.viewUsers = false;
    } else {
      this.viewUsers = true;
    }
    this.ViewProducts = false;
    this.viewOrders = false;
    this.viewStatistics = true;
  }

  @action toggleViewProducts() {
    if (this.ViewProducts) {
      this.ViewProducts = false;
    } else {
      this.ViewProducts = true;
    }
    this.viewOrders = false;
    this.viewUsers = false;
    this.viewStatistics = true;
  }

  @action toggleViewOrders() {
    if (this.viewOrders) {
      this.viewOrders = false;
    } else {
      this.viewOrders = true;
    }
    this.ViewProducts = false;
    this.viewUsers = false;
    this.viewStatistics = true;
  }

  @action toggleStatistics() {
    if (this.viewStatistics) {
      this.viewStatistics = false;
    } else {
      this.viewStatistics = true;
    }
    this.ViewProducts = false;
    this.viewUsers = false;
    this.viewOrders = false;
  }

  @action
  getAllUsersAPI = async () => {
    const users = await adminPanelService.getAllUsers();
    this.allUsers.replace(users);
  };

  @action
  getAllOrdersAPI = async () => {
    const orders = await adminPanelService.getAllOrders();
    this.allOrders.replace(orders);
  };

  @action
  getAllProductsAPI = async () => {
    try {
      const products = await adminPanelService.getAllProducts();
      this.allProducts.replace(products);
    } catch (err) {
      console.log(err);
    }
  };

  @action
  deleteOrderAPI = async id => {
    try {
      await adminPanelService.deleteOrder(id);
    } catch (err) {
      console.log(err);
    }
  };

  @action
  deleteProductAPI = async id => {
    try {
      await adminPanelService.deleteProduct(id);
    } catch (err) {
      console.log(err);
    }
  };

  @action
  deleteUserAPI = async id => {
    try {
      await adminPanelService.deleteUser(id);
    } catch (err) {
      console.log(err);
    }
  };

  @action
  statsByCategoryAPI = async () => {
    try {
      const stats = await adminPanelService.statsByCategory();
      this.statsByCategoryObject = stats.data;
    } catch (err) {
      console.log(err);
    }
  };

  @action
  statsByMonthAPI = async () => {
    try {
      const monthStats = await adminPanelService.statsByMonth();
      this.statsByMonthObject = monthStats.data;
    } catch (err) {
      console.log(err);
    }
  };

  @computed
  get getAllUsers() {
    if (this.allUsers) {
      return toJS(this.allUsers);
    }
  }

  @computed
  get getAllOrders() {
    if (this.allOrders) {
      return toJS(this.allOrders);
    }
  }

  @computed
  get getAllProducts() {
    if (this.allProducts) {
      return toJS(this.allProducts);
    }
  }
}
