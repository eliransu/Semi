import axios from "axios";
class CategoryService {
  getCategoryById = async categoryId => {
    try {
      const products = await axios.get(
        `/api/products/by-category/${categoryId}`
      );
      if (!products || !products.data || !products.data.data) return [];
      else return products.data.data;
    } catch (err) {
      throw err;
    }
  };

  getAllCategories = async () => {
    try {
      const categories = await axios.get("/api/products/categories");
      console.log({ categories: categories });
      if (!categories || !categories.data || !categories.data.data) return [];
      else return categories.data.data;
    } catch (err) {
      throw err;
    }
  };
}

export default new CategoryService();
