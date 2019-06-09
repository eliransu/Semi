import axios from "axios";
import { toJS } from "mobx";
import get from "lodash/get";
class ProductService {
  addProductToUser = (username, product, periods) => {
    console.log(`add new product to the user ${username}`, product);
    const url = `/api/add-product-as-renter/${username}`;
    const body = {
      username,
      name: product.title,
      category: product.category,
      price: product.retailPrice,
      images: toJS(product.images),
      description: product.description,
      retail_price: product.retailPrice,
      sub_category: product.sub_category,
      quality: product.quality,
      plans: periods
    };

    return axios
      .post("/api/users/product", { ...body })
      .then(response => {
        if (response && response.data.status === 201) {
          return true;
        } else {
          return response.data;
        }
      })
      .catch(err => {
        console.error("Failed to add product", err);
        throw err;
      });
  };

  getReplacementProducts = async userName => {
    try {
      const replacementArrays = await axios.get(
        `/api/users/replacement/${userName}`
      );
      if (get(replacementArrays, "data.data")) {
        return replacementArrays.data.data;
      } else {
        throw new Error("This Service not working pleace try it later");
      }
    } catch (err) {
      throw err;
    }
  };

  getProductById = async productId => {
    try {
      const product = await axios.get(`/api/products/query?id=${productId}`);
      if (!product || !product.data || !product.data.data) {
        return false;
      } else {
        console.log({ product });
        console.log("product in service", product.data.data);
        let sum = 0;
        if (get(product, "data.data.reviews.length", 0) > 0) {
          let sum = 0;
          product.data.data.reviews.forEach(review => {
            sum += review.stars;
          });

          const returnProduct = {
            ...product.data.data,
            avgScore: sum / product.data.data.reviews.length
          };
          return returnProduct;
        }

        return product.data.data;
      }
    } catch (err) {}
  };

  onProductSearch = async searchParams => {
    let url = `/api/products/search${searchParams}`;

    try {
      const seacrhItems = await axios.get(url);
      if (!seacrhItems) return [];
      else return seacrhItems.data.data;
    } catch (err) {
      console.error(err);
    }
  };

  getLatestProduct = async limit => {
    const latest = limit ? limit : 12;
    const results = await axios.get(`/api/products/latest/${latest}`);
    if (!results || !results.data) {
      return [];
    } else return results.data;
  };

  getProductsByUserName = async userName => {
    try {
      const result = await axios.get(`/api/users/products/${userName}`);
      if (!result || !result.data || !result.data.data) {
        throw new Error(
          'some problems with fetching data from server "getProductByUserName" '
        );
      }
      return result.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  getMtchingMarketProducts = async userId => {
    console.log("im here!!");
    try {
      const matchingProducts = await axios.get(
        `/api/users/products-to-replace/${userId}`
      );

      console.log({ matchingProducts });

      if (matchingProducts === "wrong userId") {
        console.log("wrong!!!");
        throw new Error("the user is not exist");
      }

      if (
        get(matchingProducts, "data.data") &&
        matchingProducts.status !== 400
      ) {
        console.log("im inside!!!");
        return matchingProducts.data.data;
      } else {
        throw new Error("Do not have Products to match");
      }
    } catch (err) {
      console.log("in service catch");
      throw err;
    }
  };
}

const productService = new ProductService();
export default productService;
