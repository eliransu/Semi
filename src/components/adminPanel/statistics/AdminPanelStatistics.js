import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../../../stores";
import AdminPanelStore from "../../../stores/AdminPanelStore";
import AllCategoryStatistics from "./AllCategoryStatistics";
import SalesStatistics from "./SalesStatistics";
import CategoryStatistics from "./CategoryStatistics";
var Chart = require("chart.js");

const adminPanelStore = rootStores[AdminPanelStore];

@observer
class AdminPanelStatistics extends Component {
  render() {
    const hide = adminPanelStore.viewStatistics ? "hide" : "";
    return (
      <div className={`admin-panel-statistics ${hide}`}>
        <AllCategoryStatistics />
        <SalesStatistics />
        <CategoryStatistics />
      </div>
    );
  }
}
export default AdminPanelStatistics;
