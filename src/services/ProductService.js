import axios from "axios";
import { toJS } from "mobx";
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
    console.log("body", body);

    return axios
      .post("/api/users/product", { ...body })
      .then(response => {
        console.log("Adding Product:", response);
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

  getProductById = async productId => {
    try {
      const product = await axios.get(`/api/products?id=${productId}`);
      if (!product || !product.data || !product.data.data) {
        return false;
      } else {
        console.log("product", product.data.data);
        debugger;
        return product.data.data;
      }
    } catch (err) {
      console.log("the request getProduct By Id faild.", err);
    }
  };
}

const productService = new ProductService();
export default productService;
