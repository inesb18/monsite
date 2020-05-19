import React, { Component } from "react";
import Slider from "react-slick";

import './SimpleSlider.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      variableHeight: true,
      slickGoTo: this.props.slickGoTo
    };
    return (
        <Slider {...settings}>
          {this.props.children}
        </Slider>
    );
  }
}
