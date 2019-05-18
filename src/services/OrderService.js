import axios from 'axios'
class OrderService {
  getAllOrdersByUserNameAndType = async (userName, type) => {
    const url = `/api/users/orders?username=${userName}&type=${type}`;
    const orders = await axios.get(url);
    if (orders || orders.data || orders.data.data) return orders.data.data;
    else return [];
  };

  changeOrderStatus = async (providerUsername, orderId, accepted) => {
    const body = {
      providerUsername,
      orderId,
      accepted
    };
    try{
    const result = await axios.put("/api/orders/accept", body);
    console.log("result changeOrderStatus: ", result);
    }
    catch(err){
        console.log("ERROR in changeOrderStatus: ", err);
    }

  };
}
export default new OrderService();