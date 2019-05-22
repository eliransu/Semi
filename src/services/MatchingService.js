import axios from "axios";
class MatchingService {
  enterProductsForMatch = async (userId, action, productIds) => {
    const body = {
      userId,
      action,
      productIds
    };
    console.log({ body });
    console.log("matching service");
    const result = await axios.post("/api/users/match", body);
    console.log({ result });
  };
}

export default new MatchingService();
