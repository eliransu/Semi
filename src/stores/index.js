

import ProductStore from './ProductStore';
import CategoryStore from './CategoryStore';
import AuthStore from './AuthStore';
import PaymentStore from './PaymentStore';


//Initiate all stores
const authStore = new AuthStore();
const productStore = new ProductStore();
const categoryStore = new CategoryStore();
const paymentStore = new PaymentStore();



//save the instances in global object
const rootStores = {
  [ProductStore]: productStore,
  [CategoryStore]: categoryStore,
  [AuthStore]: authStore,
  [PaymentStore]: paymentStore

};

// TODO: Debugging purpose - delete
window['stores'] = rootStores;

export default rootStores;