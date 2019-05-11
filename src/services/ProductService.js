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

        return product.data.data;
      }
    } catch (err) {
      console.log("the request getProduct By Id faild.", err);
    }
  };

  onProductSearch = async searchParams => {
    const seacrhItems = await axios.get(
      `/api/products/search?categoryName=${
        searchParams.categoryName
      }&&productName=${searchParams.productName}&&minPrice=${
        searchParams.minPrice
      }&&maxPrice=${searchParams.maxPrice}&&userName=${
        searchParams.userName
      }&&quality=${searchParams.quality}`
    );
    console.log({ seacrhItems });
  };

  getLatestProduct = async limit => {
    const latest = limit ? limit : 12;
    const results = await axios.get(`/api/products/latest/${latest}`);
    if (!results || !results.data) {
      return [];
    } else return results.data;
  };

  getProductsByUserName = async userName => {
    console.log("im in service!!!");
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
}

const productService = new ProductService();
export default productService;
