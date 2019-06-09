import axios from "axios";
import get from "lodash/get";

class AuthService {
  login = async (email, password) => {
    const body = {
      email,
      password
    };
    try {
      const result = await axios.post("/api/auth/login", body);
      if (result && result.data && result.data.status === 200) {
        // console.log({ result });
        return result.data.data;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw err;
    }
  };

  logOut = async () => {
    try {
      const res = await axios.post("/api/auth/logout", {});
      if (res && res.data) {
        return true;
      }
    } catch (err) {
      throw err;
    }
  };

  register = async user => {
    const result = await axios.post("/api/auth/register", user);
    if (result) {
      return result;
    }
  };

  tryLogin = async () => {
    try {
      console.log("im in tryLogin");

      const user = await axios.get("/api/users/active-user");
      console.log("user", user);
      if (!user || !user.data || !user.data.data) {
        console.log("not login");
        return null;
      } else {
        return user.data.data;
      }
    } catch (err) {
      throw err;
    }
  };

  getUserData = async userName => {
    try {
      console.log("im here", userName);
      const userData = await axios.get(`/api/users/userdata/${userName}`);
      console.log({ userData });
      if (get(userData, "data.data")) {
        return userData.data.data;
      } else {
        throw new Error("The user is not exist.");
      }
    } catch (err) {
      throw err;
    }
  };
}
export default new AuthService();
