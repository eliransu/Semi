import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../../../stores";
import AdminPanelStore from "../../../stores/AdminPanelStore";
import { toJS } from "mobx";
var Chart = require("chart.js");

const adminPanelStore = rootStores[AdminPanelStore];

@observer
class SalesStatistics extends Component {
  async componentDidMount() {
    const node = this.node;

    try {
      await adminPanelStore.statsByMonthAPI();
    } catch (err) {
      console.log(err);
    }
    const stattistics = adminPanelStore.statsByMonthObject;
    var months = [];
    var results = [];
    const temp = stattistics.map(
      data => (months.push(data.month), results.push(data.numOfOrders))
    );
    var myChart = new Chart(node, {
      type: "line",
      data: {
        labels: months.reverse(),
        datasets: [
          {
            label: "Monthly rentals",
            data: results.reverse()
            // backgroundColor: [
            //   "rgba(255, 99, 132)",
            //   "rgba(54, 162, 23)",
            //   "rgba(55, 26, 86)",
            //   "rgba(75, 192, 192)",
            //   "rgba(153, 102, 255)",
            //   "rgba(255, 159, 64)",
            //   "rgba(255, 199, 132)",
            //   "rgba(132, 162, 23)",
            //   "rgba(55, 26, 86)",
            //   "rgba(75, 192, 192)",
            //   "rgba(153, 102, 1)",
            //   "rgba(189, 59, 64)"
            // ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className={`admin-panel-sales-statistics`}>
        <h1>Rents Statistics</h1>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default SalesStatistics;

// [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ]
