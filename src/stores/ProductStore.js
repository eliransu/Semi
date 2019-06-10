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
  matchingProducts = observable([]);

  @observable
  allProducts = observable([]);

  @observable
  latestProducts = [];

  @observable
  searchResult = observable([]);

  @observable avgScore;

  @action
  addPeriod = period => {
    this.periods.push(period);
  };

  @action
  setMatchingProducts = products => {
    if (products) {
      this.matchingProducts.replace(products);
    }
  };

  @action
  getMtchingMarketProducts = async userId => {
    try {
      const productToMatch = await productService.getMtchingMarketProducts(
        userId
      );
      if (productToMatch) this.setMatchingProducts(productToMatch);
      return true;
    } catch (err) {
      throw err;
    }
  };
  @action
  newProduct = () => {
    const product = new Product();

    this.currentProduct = product;
  };
  @action
  setLatestProducts = latestProducts => {
    this.latestProducts = latestProducts;
  };

  @action
  getReplacementProducts = async userName => {
    return await productService.getReplacementProducts(userName);
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
    try {
      const product = await productService.getProductById(productId);
      if (product) {
        this.setCurrentProduct(product);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
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
      return true;
    } catch (err) {
      throw err;
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
  get getMatchingProducts() {
    return toJS(this.matchingProducts) || [];
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

  @action
  getAvargeScoreByProduct = product => {
    var sum = 0;
    if (product.reviews.length > 0) {
      for (let i = 0; i < product.reviews.length; i++) {
        sum += product.reviews[i].stars;
      }
      return sum / product.reviews.length;
    } else return 0;
  };

  @action
  getAvarageScore() {
    let sum = 0;
    if (
      !this.getCurrentProduct ||
      (!this.getCurrentProduct.reviews ||
        !this.getCurrentProduct.reviews.length > 0)
    ) {
      return sum;
    }

    this.getCurrentProduct.reviews.forEach(review => {
      sum += review.stars;
    });

    this.avgScore = sum / this.currentProduct.reviews.length;
  }

  @computed
  get getAllProducts() {
    return toJS(this.allProducts) || [];
  }

  @computed
  get getavgScore() {
    return this.avgScore;
  }
}
