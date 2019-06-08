import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../../../stores";
import AdminPanelStore from "../../../stores/AdminPanelStore";
var Chart = require("chart.js");

const adminPanelStore = rootStores[AdminPanelStore];

@observer
class SalesStatistics extends Component {
  componentDidMount() {
    const node = this.node;

    var myChart = new Chart(node, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Monthly rentals",
            data: [12, 19, 3, 5, 2, 3, 5, 8, 11, 45, 2, 4]
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
