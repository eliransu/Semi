import axios from "axios";

class AuthService {
  login = async (email, password) => {
    const body = {
      email,
      password
    };
    const result = await axios.post("api/auth/login", body);
    return result.data.data;
  };

  register = async user => {
    const result = await axios.post("/api/auth/register", user);
    if (result) {
      console.log("register", result);
      return result;
    }
  };

  tryLogin = async () => {
    try {
      const user = await axios.get("/api/users/active-user");
      console.log("user", user.data.data);
      if (!user || !user.data || !user.data.data) {
        return false;
      } else {
        console.log("im in else");
        return user.data.data;
      }
    } catch (err) {
      throw err;
    }
  };
}
export default new AuthService();
