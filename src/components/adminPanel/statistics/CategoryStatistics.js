import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../../../stores";
import AdminPanelStore from "../../../stores/AdminPanelStore";
import { Select } from "antd";
var Chart = require("chart.js");
const { Option } = Select;

function handleChange(value) {
  adminPanelStore.viewStatisticsByCategory = true;
}

const adminPanelStore = rootStores[AdminPanelStore];

@observer
class CategoryStatistics extends Component {
  componentDidMount() {
    const node = this.node;

    var myChart = new Chart(node, {
      type: "bar",
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
            data: [12, 19, 3, 5, 2, 3, 5, 8, 11, 45, 2, 4],
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(54, 162, 23)",
              "rgba(55, 26, 86)",
              "rgba(75, 192, 192)",
              "rgba(153, 102, 255)",
              "rgba(255, 159, 64)",
              "rgba(255, 199, 132)",
              "rgba(132, 162, 23)",
              "rgba(55, 26, 86)",
              "rgba(75, 192, 192)",
              "rgba(153, 102, 1)",
              "rgba(189, 59, 64)"
            ]
          }
        ]
      }
    });
  }
  render() {
    const hide = adminPanelStore.viewStatisticsByCategory ? "" : "hide";
    return (
      <div className={`admin-panel-category-statistics`}>
        <h1>Statistics by Category</h1>

        <Select
          defaultValue="Select Categry"
          style={{ width: 220 }}
          onChange={handleChange}
        >
          <Option value="jack"> Baby&Toddler</Option>
          <Option value="lucy">Furniture</Option>
          <Option value="Yiminghe">Arts&Entertainment</Option>
          <Option value="Yiminghe">Home&Garden</Option>
        </Select>

        <div className={`category-statistic-canvas ${hide}`}>
          <canvas
            style={{ width: 800, height: 300 }}
            ref={node => (this.node = node)}
          />
        </div>
      </div>
    );
  }
}

export default CategoryStatistics;
