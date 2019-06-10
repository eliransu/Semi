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

  @observable allOrdersAsConsumer = observable([]);

  @observable showReview;

  @observable data;

  @observable reviewData = {};

  constructor(authStore) {
    this.authStore = authStore;
  }
  @action
  loadOrdersAsConsumer = async () => {
    const currentUser = this.authStore.getCurrentUser;
    if (currentUser) {
      await OrderService.getAllOrdersByUserNameAndType(
        currentUser.username,
        orderType.Consumer
      )
        .then(allOrdersAsConsumer => {
          if (this.allOrdersAsConsumer) {
            this.allOrdersAsConsumer.replace(toJS(allOrdersAsConsumer));
          } else this.allOrdersAsConsumer = [];
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.allOrdersAsConsumer = [];
    }
  };

  @action
  toggleAddReview = () => {
    if (this.showReview) {
      this.showReview = false;
    } else {
      this.showReview = true;
    }
  };

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
  addReviewAPI = async () => {
    return await OrderService.addReview(this.reviewData);
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
    return notifications;
  }

  @computed
  get getAllOrdersAsConsumer() {
    if (this.allOrdersAsConsumer) {
      return toJS(this.allOrdersAsConsumer);
    }
  }

  @computed
  get getLengthOrdersNotHandeledAsProvider() {
    return this.getallOrdersNotHendeledAsProvider.length || 0;
  }
}
