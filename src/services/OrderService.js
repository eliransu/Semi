import axios from 'axios'
class OrderService{


    getAllOrdersByUserNameAndType = async (userName, type)=>{
        const url = `/api/users/orders?username=${userName}&type=${type}`;
    const orders = await axios.get(url)
    if (orders || orders.data || orders.data.data)
        return orders.data.data;
    else 
        return [];
    }
}
export default new OrderService();