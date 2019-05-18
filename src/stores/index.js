

import ProductStore from './ProductStore';
import CategoryStore from './CategoryStore';
import AuthStore from './AuthStore';
import PaymentStore from './PaymentStore';
import OrderStore from './OrderStore';


//Initiate all stores
const authStore = new AuthStore();
const productStore = new ProductStore();
const categoryStore = new CategoryStore();
const paymentStore = new PaymentStore();
const orderStore = new OrderStore()



//save the instances in global object
const rootStores = {
  [ProductStore]: productStore,
  [CategoryStore]: categoryStore,
  [AuthStore]: authStore,
  [PaymentStore]: paymentStore,
  [OrderStore]: orderStore

};

// TODO: Debugging purpose - delete
window['stores'] = rootStores;

export default rootStores;