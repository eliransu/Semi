import axios from "axios";

const mapNumberToMonth = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

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

  async statsByCategory() {
    try {
      const res = await axios.get(`/api/orders/stats-by-category`);
      if (res) {
        const stats = res.data;
        return stats;
      }
      throw new Error("Error in response from statsByCategory");
    } catch (err) {
      console.log(`error in statsByCategory`, err);
      throw err;
    }
  }

  async statsByMonth() {
    try {
      const res = await axios.get(`/api/orders/stats-by-month`);
      if (res) {
        const stats = res.data;
        stats.data = stats.data.map(data => ({
          month: mapNumberToMonth[data.month],
          numOfOrders: data.numOfOrders
        }));
        console.log(stats);

        return stats;
      }
      throw new Error("Error in response from statsByMonth");
    } catch (err) {
      console.log(`error in statsByMonth`, err);
      throw err;
    }
  }
}

export default new AdminPanelService();
