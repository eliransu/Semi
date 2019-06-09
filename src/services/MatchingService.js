import axios from "axios";
import get from "lodash/get";
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
      if (!result.status === 201) {
        throw new Error("The Matching service not working, try it later");
      } else return result.status;
    } catch (err) {
      throw err;
    }
  };

  checkMatching = async userName => {
    console.log("hereeeeeeeee");
    try {
      const match = await axios.get(`/api/users/matching/${userName}`);
      console.log({ match });
      if (get(match, "data.data.length") > 0) {
        console.log("im in if");
        return match.data.data;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  };
}

export default new MatchingService();
