import React, { Component } from "react";
import "./ImageCarousel.css";
import { Carousel } from "antd";

export class ImageCarousel extends React.Component {
  renderAllImages = imgList => {
    return imgList.map(img => (
      <div>
        <img alt="product" src={`${img}`} />
      </div>
    ));
  };

        render()
        {
                
        return(
            <Carousel autoplay>
                {this.renderAllImages(this.props.imgList)}
            </Carousel>
            );
        }
}
export default ImageCarousel;
