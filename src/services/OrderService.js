import axios from "axios";
class OrderService {
  getAllOrdersByUserNameAndType = async (userName, type) => {
    const url = `/api/users/orders?username=${userName}&type=${type}`;
    const orders = await axios.get(url);
    if (orders || orders.data || orders.data.data) return orders.data.data;
    else return [];
  };

  changeOrderStatus = async (providerName, orderId, accepted) => {
    const body = {
      providerName,
      orderId,
      accepted
    };
    try {
      const result = await axios.put("/api/orders/accept", body);
      console.log({ accept: result });
      console.log("result changeOrderStatus: ", result);
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
    console.log("body", body);
    try {
      const result = await axios.post("/api/orders", body);
    } catch (err) {
      console.log("ERROR in createNewOrder: ", err);
    }
  }
}
export default new OrderService();
