import axios from "axios";

class AdminPanelService {
  getAllUsers = async () => {
    try {
      const users = await axios.get("/api/users");
      if (users) {
        return users.data.data;
      }
    } catch (err) {
      throw err;
    }
  };

  getAllProducts = async () => {
    try {
      const products = await axios.get("/api/products");
      if (products) {
        return products.data.data;
      }
    } catch (err) {
      throw err;
    }
  };

  getAllOrders = async () => {
    try {
      const orders = await axios.get("/api/orders");
      if (orders) {
        return orders.data.data;
      }
    } catch (err) {
      throw err;
    }
  };

  deleteOrder = async id => {
    try {
      const res = await axios.delete(`/api/orders/${id}`);
      if (res) {
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  deleteProduct = async id => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      if (res) {
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  deleteUser = async id => {
    try {
      const res = await axios.delete(`/api/users/${id}`);
      if (res) {
        return res;
      }
    } catch (err) {
      throw err;
    }
  };
}

export default new AdminPanelService();
