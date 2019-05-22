import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Calendar, Badge, Avatar,Button, Icon } from "antd";
import moment from "moment";
import "./ProductCalendar.css";
import PaymentStore from "../../stores/PaymentStore";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import {withRouter} from 'react-router'
function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const paymentStore = rootStores[PaymentStore]
const productStore = rootStores[ProductStore]

class ProductCalendar extends Component {
         state = {
           orderDaysOfYear: []
         };

         constructor(props) {
           super(props);
           let orders = this.props.data;

           let orderDaysOfYear = [];
           orders.map(order => {
             for (
               let i = moment(order.startDate).dayOfYear();
               i <= moment(order.endDate).dayOfYear();
               i++
             ) {
               orderDaysOfYear.push({
                 day: i,
                 consumerName: order.consumer.name,
                 consumerAvatar: order.consumer.avatar
               });
             }
           });
           this.state = {
             orderDaysOfYear: orderDaysOfYear
           };
         }

         convertBorrowDateToListData = value => {
           const consumer = this.state.orderDaysOfYear.filter(
             item => item.day === value.dayOfYear()
           );
           let listData;
           if (
             this.state.orderDaysOfYear.some(
               item => item.day === value.dayOfYear()
             )
           ) {
             listData = [
               {
                 type: "error",
                 content: "Product rented by:",
                 consumerName: consumer[0]["consumerName"],
                 consumerAvatar: consumer[0]["consumerAvatar"]
               }
             ];
           }
           return listData || [];
         };

         renderItem = item => {
           return (
             <>
               <li key={item.content}>
                 <Badge status={item.type} text={item.content} />
               </li>
               <li style={{ display: "flex", justifyContent: "center" }}>
                 <Avatar
                   src={require(`../../assets/${item.consumerAvatar}`)}
                 />
                 <a href=""> {item.consumerName}</a>
               </li>
             </>
           );
         };

         redirectToPaymentPage = (day) => {
           paymentStore.currentProduct = productStore.currentProduct;
           paymentStore.providerName = productStore.currentProduct
             ? productStore.currentProduct.owner.username
             : "";
           paymentStore.startDate = day;

           this.props.history.push('/paymentPage')

         };

         dateCellRender = day => {
           const listData = this.convertBorrowDateToListData(day);
           if (listData.length > 0) {
             return (
               <ul className="events">
                 {listData.map(item => {
                   this.renderItem(item);
                 })}
               </ul>
             );
           } else {
             return (
               <Button
                 onClick={()=>this.redirectToPaymentPage(day)}
                 type="primary"
                 shape="round"
               > 
                Order Now!
                 <Icon type="right" />
               </Button>
             );
           }
         };

         render() {
           return (
             <div
               style={{
                 width: 1250,
                 border: "1px solid #d9d9d9",
                 borderRadius: 10,
                 margin: "auto"
               }}
             >
               <Calendar
                 dateCellRender={this.dateCellRender}
                 monthCellRender={monthCellRender}
               />
               ,
             </div>
           );
         }
       }


export default withRouter(ProductCalendar)
