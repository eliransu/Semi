import axios from "axios";
class MatchingService {
  enterProductsForMatch = async (userId, action, productIds) => {
    const body = {
      userId,
      action,
      productIds
    };
    try {
      const result = await axios.post("/api/users/match", body);
      console.log({ result });
      if (!result || !result.data.status === 201) {
        throw new Error("The Matching service not working, try it later");
      }
    } catch (err) {
      throw err;
    }
  };
}

export default new MatchingService();
