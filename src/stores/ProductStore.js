import { action, computed, observable, toJS } from "mobx";
import ProductService from "../services/ProductService";
import Product from "../models/Product";
import productService from "../services/ProductService";
import AuthStore from "./AuthStore";
import rootStores from "./index";
import moment from "moment";

export default class ProductStore {
  authStore;

  constructor(authStore) {
    this.authStore = authStore;
  }
  @observable
  currentProduct;

  @observable
  periods = [];

  @observable
  allProducts = observable([]);

  @observable
  latestProducts = [];

  @observable
  searchResult = observable([]);

  @action
  addPeriod = period => {
    this.periods.push(period);
  };
  @action
  newProduct = () => {
    const product = new Product();

    this.currentProduct = product;
  };
  setLatestProducts = latestProducts => {
    this.latestProducts = latestProducts;
  };

  @action
  getLatestProduct = async limit => {
    const latestProducts = await productService.getLatestProduct(limit);
    this.setLatestProducts(latestProducts);
  };

  @action
  setSearchResult = results => {
    this.searchResult.replace(results);
  };

  @action
  getProductById = async productId => {
    const product = await productService.getProductById(productId);
    if (product) {
      this.setCurrentProduct(product);
      return true;
    } else {
      return false;
    }
  };

  @action
  setAllProducts = products => {
    this.allProducts.replace(products);
  };

  @action
  getProductsByUserName = async userName => {
    try {
      const products = await productService.getProductsByUserName(userName);
      this.setAllProducts(products);
    } catch (err) {
      console.error(err);
    }
  };

  @action
  onProductSearch = async sarchParams => {
    const results = await productService.onProductSearch(sarchParams);
    this.setSearchResult(results);
  };
  @action
  setCurrentProduct(product) {
    this.currentProduct = product;
  }

  @action
  createProduct = (product, userName) => {
    return ProductService.addProductToUser(userName, product, this.getPeriods);
  };
  @computed
  get getCurrentProduct() {
    return toJS(this.currentProduct) || {};
  }

  @computed
  get getSearchResult() {
    return toJS(this.searchResult) || [];
  }
  @computed
  get getLatestProducts() {
    return toJS(this.latestProducts) || [];
  }

  @computed
  get getPeriods() {
    return toJS(this.periods) || [];
  }

  @computed
  get getAvarageScore() {
    let sum = 0;
    console.log(
      "iii",
      this.currentProduct ? this.getCurrentProduct.reviews : null
    );
    if (
      !this.getCurrentProduct ||
      (!this.getCurrentProduct.reviews ||
        !this.getCurrentProduct.reviews.length > 0)
      // get(this.getCurrentProduct, 'reviews.length') > 0
    ) {
      console.log("not reviews");
      return sum;
    }

    console.log("we have some reviews");
    this.getCurrentProduct.reviews.forEach(review => {
      sum += review.stars;
    });

    return sum / this.currentProduct.reviews.length;
  }

  @computed
  get getAllProducts() {
    return toJS(this.allProducts) || [];
  }
}
