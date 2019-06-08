import { action, computed, observable, toJS } from "mobx";
import OrderService from "../services/OrderService";
import orderBy from "lodash/orderBy";

export const OrderStatus = {
  Hendeled: "handled",
  NotHendeled: "not handled"
};

export const orderType = {
  Provider: "Provider",
  Consumer: "Consumer"
};

export default class OrderStore {
  authStore;

  @observable
  currentOrder;

  @observable
  allOrdersAsProvider = observable([]);

  @observable
  allOrdersNotHendeledAsProvider = observable([]);

  constructor(authStore) {
    this.authStore = authStore;
  }

  @action
  loadAllOrders() {
    let allOrdersNotHendeledAsProvider = [];
    const currentUser = this.authStore.getCurrentUser;
    OrderService.getAllOrdersByUserNameAndType(
      currentUser.username,
      orderType.Provider
    )
      .then(allOrdersAsProvider => {
        this.allOrdersAsProvider.replace(toJS(allOrdersAsProvider));
      })
      .then(() => {
        allOrdersNotHendeledAsProvider = this.allOrdersAsProvider.filter(
          order => {
            return order.order_status === OrderStatus.NotHendeled;
          }
        );
        this.allOrdersNotHendeledAsProvider.replace(
          allOrdersNotHendeledAsProvider
        );
      });
  }

  @action
  getOrderById(id) {
    const order = this.allOrdersAsProvider.filter(order => order._id === id)[0];
    return order;
  }

  @action
  changeOrderStatus = async (order, accept) => {
    return await OrderService.changeOrderStatus(
      order.provider.username,
      order._id,
      accept
    );
  };

  @action
  createNewOrder = async (
    providerName,
    consumerName,
    productId,
    plan,
    payment,
    startDate
  ) => {
    return OrderService.createNewOrder(
      providerName,
      consumerName,
      productId,
      plan,
      payment,
      startDate
    );
  };

  @computed
  get currentOrder() {
    return this.currentOrder;
  }

  @computed
  get getAllOrdersAsProvider() {
    const orderedAllOrdersAsProvider = orderBy(this.allOrdersAsProvider, [
      order => order["order_status"]
    ]);
    return orderedAllOrdersAsProvider;
  }

  @computed
  get getallOrdersNotHendeledAsProvider() {
    return toJS(this.allOrdersNotHendeledAsProvider);
  }

  @computed
  get getAllOrdersAsNotifications() {
    let notifications = [];

    if (toJS(this.allOrdersAsProvider)) {
      this.allOrdersAsProvider.forEach(order => {
        let notif = {
          OrderId: order._id,
          title:
            order.order_status === OrderStatus.NotHendeled
              ? "new order request"
              : "old request",
          consumerName: order.consumer.username,
          consumerAvatar: order.consumer.profile_image
        };

        notifications.push(notif);
      });
    }

    return toJS(notifications);
  }
  @computed
  get getLengthOrdersNotHandeledAsProvider() {
    return this.getallOrdersNotHendeledAsProvider.length || 0;
  }
}
