import React, { Component } from "react";
import SearchMain from "../mainHero/SearchForMainHero";
import queryString from "query-string";

class SearchComponenet extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log({ values });
  }
  render() {
    return (
      <div className="search-page-main-container">
        <div className="search-tab" style={{ padding: "35px 0px" }}>
          <SearchMain />
        </div>
        <div className="search-result-header" style={{ textAlign: "center" }}>
          <h1 style={{ textDecoration: "underline" }}>Search Result</h1>
        </div>
      </div>
    );
  }
}

export default SearchComponenet;
