import axios from "axios";
import { toJS } from "mobx";
class OrderService {
  getAllOrdersByUserNameAndType = async (userName, type) => {
    const url = await `/api/users/orders?username=${userName}&type=${type}`;
    try {
      const orders = await axios.get(url);
      // if (!orders || !orders.data || !orders.data.data) {
      //   return [];
      // } else {
      return orders.data.data;
    } catch (err) {
      console.log("cath", err);
    }
  };

  addReview = async data => {
    try {
      const res = await axios.post("api/products/review", data);
      if (res.data.status === 204) {
        return true;
      }
    } catch (err) {
      throw err;
    }
  };

  changeOrderStatus = async (providerName, orderId, accepted) => {
    const body = {
      providerName,
      orderId,
      accepted
    };
    try {
      const result = await axios.put("/api/orders/accept", body);
      if (result.data.status === 204) {
        return true;
      } else {
        throw new Error("Try it later");
      }
    } catch (err) {
      console.log("ERROR in changeOrderStatus: ", err);
    }
  };

  async createNewOrder(
    providerName,
    consumerName,
    productId,
    plan,
    Payment,
    startDate
  ) {
    const body = {
      providerName,
      consumerName,
      productId,
      plan,
      Payment,
      startDate
    };
    try {
      const result = await axios.post("/api/orders", body);
      if (result) {
        return true;
      } else return false;
    } catch (err) {
      console.log("ERROR in createNewOrder: ", err);
    }
  }
}
export default new OrderService();
