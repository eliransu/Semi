

import ProductStore from './ProductStore';
import CategoryStore from './CategoryStore';
import AuthStore from './AuthStore';
import OrderStore from "./OrderStore";


 //Initiate all stores
 const authStore = new AuthStore();
const productStore = new ProductStore();
const categoryStore = new CategoryStore();
const orderStore = new OrderStore(authStore);


//save the instances in global object
const rootStores = {
  ["ProductStore"]: productStore,
  [CategoryStore]: categoryStore,
  [AuthStore]: authStore,
  [OrderStore]: orderStore
};

// TODO: Debugging purpose - delete
window['stores'] = rootStores;

export default rootStores;