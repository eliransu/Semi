import ProductStore from "./ProductStore";
import CategoryStore from "./CategoryStore";
import AuthStore from "./AuthStore";
import PaymentStore from "./PaymentStore";
import OrderStore from "./OrderStore";
import ViewStore from "./ViewStore";
import MatchesStore from "./MatchesStore";

//Initiate all stores
const authStore = new AuthStore();
const productStore = new ProductStore(authStore);
const categoryStore = new CategoryStore(authStore);
const paymentStore = new PaymentStore(authStore);
const orderStore = new OrderStore(authStore);
const viewStore = new ViewStore(authStore);
const matchesStore = new MatchesStore(authStore);

//save the instances in global object
const rootStores = {
  [ProductStore]: productStore,
  [CategoryStore]: categoryStore,
  [AuthStore]: authStore,
  [PaymentStore]: paymentStore,
  [OrderStore]: orderStore,
  [ViewStore]: viewStore,
  [MatchesStore]: matchesStore
};

// TODO: Debugging purpose - delete
window["stores"] = rootStores;

export default rootStores;
