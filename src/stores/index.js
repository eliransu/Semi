

import ProductStore from './ProductStore';
import CategoryStore from './CategoryStore';
import AuthStore from './AuthStore';


 //Initiate all stores
 const authStore = new AuthStore();
const productStore = new ProductStore();
const categoryStore = new CategoryStore();



//save the instances in global object
const rootStores = {
    ['ProductStore']: productStore,
    [CategoryStore]:categoryStore,
    [AuthStore]:authStore

};

// TODO: Debugging purpose - delete
window['stores'] = rootStores;

export default rootStores;