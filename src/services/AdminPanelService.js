import axios from "axios";

class AdminPanelService {
  getAllUsers = async () => {
    try {
      const users = await axios.get("/api/users");
      if (users) {
        console.log("all users are", users.data.data);
        return users.data.data;
      }
    } catch (err) {
      throw err;
    }
  };
}

export default new AdminPanelService();
