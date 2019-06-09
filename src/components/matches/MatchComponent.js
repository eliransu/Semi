import React, { Component } from "react";
import MatchNode from "./MatchNode";
const data = [
  {
    consumer: "elranh1",
    producer: "elikos1",
    product: {
      _id: "5cf2ac51f1ae011a08cac88f",
      images: [
        "https://www.rentproductsonline.com/uploads/cache/91Sfuz85srL-500x500.jpg"
      ],
      deleted: false,
      reviews: [],
      name:
        "Graco Tranzitions 3-in-1 Harness Booster Convertible Car Seat, Basin",
      category: "5ce011600f908bc6d057aef8",
      description: " Free Shipping",
      quality: "New",
      owner: "5cf2abbfe44b1619497f5d70"
    }
  },
  {
    consumer: "alon",
    producer: "eliranh1",
    product: {
      _id: "5cf2ac51f1ae011a08cac890",
      images: [
        "https://www.rentproductsonline.com/uploads/cache/71PeAUiV-rL-500x500.jpg"
      ],
      deleted: false,

      createdAt: "2019-06-01T16:47:34.492Z",
      name:
        "Graco Table2Table Premier Fold 7-in-1 Convertible High Chair, Landry",
      category: "5ce011600f908bc6d057aef9",
      description: " Free Shipping",
      quality: "New",
      owner: "5cf2abbfe44b1619497f5d70"
    }
  },
  {
    consumer: "elikos1",
    producer: "alon",
    product: {
      _id: "5cf2ac51f1ae011a08cac88d",
      images: [
        "https://www.rentproductsonline.com/uploads/cache/91j1qbROAML-500x500.jpg"
      ],
      deleted: false,

      createdAt: "2019-06-01T16:47:34.492Z",
      name: "Baby Trend Expedition Jogger Travel System, Millennium White",
      category: "5ce011600f908bc6d057aef8",
      description: " Free Shipping",
      quality: "New",
      owner: "5cf2abbfe44b1619497f5d70"
    }
  }
];

export default class MatchComponent extends Component {
  render() {
    return (
      <div>
        <MatchNode userId={data[0].owner} />
      </div>
    );
  }
}
