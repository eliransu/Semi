import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../../../stores";
import AdminPanelStore from "../../../stores/AdminPanelStore";
var Chart = require("chart.js");

const adminPanelStore = rootStores[AdminPanelStore];

@observer
class CategoryStatistics extends Component {
  componentDidMount() {
    const node = this.node;

    var myChart = new Chart(node, {
      type: "pie",
      data: {
        labels: ["Phones", "Laptop", "Furniture", "Garden", "Home", "Cars"],
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(54, 162, 23)",
              "rgba(55, 26, 86)",
              "rgba(75, 192, 192)",
              "rgba(153, 102, 255)",
              "rgba(255, 159, 64)"
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className={`admin-panel-all-category-statistics`}>
        <h1>All Category Statistics</h1>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}
export default CategoryStatistics;
