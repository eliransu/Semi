import { observable, computed, toJS, action } from "mobx";
import CategoryService from "../services/CategoryService";

export default class CategoryStore {
  @observable
  allCategoires = observable([]);

  @observable
  currentCategory;

  @observable
  currentCategoryId;

  @action
  setCategoryId = id => {
    this.categoryId = id;
  };
  @action
  init = async () => {
    await this.getCategories();
  };
  @action
  setCurrentCategory = category => {
    this.currentCategory = category;
  };
  @action
  setAllCategories = categories => {
    this.allCategoires.replace(categories);
  };

  @action
  getCategories = async () => {
    const categories = await CategoryService.getAllCategories();
    this.setAllCategories(categories);
  };

  @action
  getCategoryById = async categoryId => {
    try {
      const result = await CategoryService.getCategoryById(categoryId);
      this.setCurrentCategory(result);
      if (this.getCurrentCategory[0]) {
        return true;
      } else return false;
    } catch (err) {
      throw err;
    }
  };

  @computed
  get getCurrentCategoryId() {
    return this.categoryId || "default";
  }

  @computed
  get getCurrentCategory() {
    return toJS(this.currentCategory) || [];
  }

  @computed
  get getAllCategories() {
    return toJS(this.allCategoires) || [];
  }
}
