import { action, computed, observable, toJS } from 'mobx';
import OrderService from "../services/OrderService";
import orderBy from 'lodash/orderBy'

export const OrderStatus = {
         Hendeled: "handled",
         NotHendeled: "not handled"
       };

export const orderType = {
    Provider : 'Provider',
    Consumer : 'Consumer',
}



export default class OrderStore {
    
    authStore;
    
    @observable
    currentOrder;
    
    @observable
    allOrdersAsProvider = observable([]);
    
    @observable
    allOrdersNotHendeledAsProvider = observable([]);
    
    constructor(authStore) {
        this.authStore = authStore;
    }

    @action
    loadAllOrders(){
        
        const currentUser = this.authStore.getCurrentUser;
        if(currentUser){
            OrderService.getAllOrdersByUserNameAndType(currentUser.username,orderType.Provider)
            .then( allOrdersAsProvider =>{
                if(this.allOrdersAsProvider)
                    this.allOrdersAsProvider.replace(toJS(allOrdersAsProvider))
                else
                    this.allOrdersAsProvider=[];
            }).then(() =>{
                const allOrdersNotHendeledAsProvider = this.allOrdersAsProvider.filter(
                    order => order.order_status === OrderStatus.NotHendeled);
                    this.allOrdersNotHendeledAsProvider.replace(toJS(allOrdersNotHendeledAsProvider))
                    })
        }
        else{
            this.allOrdersNotHendeledAsProvider = [];
            this.allOrdersAsProvider = [];
        }
    }
    
    @action
    getOrderById(id){
        const order = this.allOrdersAsProvider.filter(
          order => order._id === id
        )[0];
        return order;
    }

    @action
    changeOrderStatus(order, accept){
        OrderService.changeOrderStatus(order.provider.username,order._id,accept);
    }

    @computed
    get currentOrder(){
        return this.currentOrder;
    }
    
    @computed
    get getAllOrdersAsProvider(){
    const orderedAllOrdersAsProvider = orderBy(
      this.allOrdersAsProvider,
      [order => order["order_status"]],
      ["desc"]
    );
        return orderedAllOrdersAsProvider;
    }

    @computed
    get getallOrdersNotHendeledAsProvider(){
        return toJS(this.allOrdersNotHendeledAsProvider);
    }
    @computed
    get getLengthOrdersNotHandeledAsProvider(){
        return toJS(this.allOrdersNotHendeledAsProvider).length>0?toJS(this.allOrdersNotHendeledAsProvider).length : 0;

    }

    @computed
    get getAllOrdersAsNotifications(){
        let notifications = [];
        const notif = {OrderId:"",title:"",consumerName:"",consumerAvatar:""}
        if(this.allOrdersAsProvider){
            this.allOrdersAsProvider.forEach(order => {
                notif["OrderId"] = order._id;
                notif["title"] = order.order_status===OrderStatus.NotHendeled ? "new order request" : "old request"; 
                notif["consumerName"] = order.consumer.username;
                notif["consumerAvatar"] = order.consumer.profile_image;
                notifications = [...notifications,notif];
            });
        }
        return notifications;
      }

}