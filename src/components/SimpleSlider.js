import React, { Component } from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const StyledCarousel = styled.div`
  .slick-slide div {
    outline: none;
  }
  .slick-slider {
    height: 80vh;
    .imageSlideWrap {
      display: flex;
    }
    img {
      margin: 0 auto;
      max-height: 80vh;
      width: auto;
      object-fit: contain;
      overflow: hidden;
    }
  }
  .arrows {
    width: fit-content;
    margin: 0 auto;
    button {
      cursor: pointer;
      border: none;
      background: none;
      outline: none;
      &:focus {
        outline: none;
      }
      &:first-child: {
        margin: right: 1rem;
      }
      svg {
        color: ${props => props.theme.peach};
        &:hover {
          color: ${props => props.theme.darkPeach};
        }
      }
    }
  }
`;

export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.handleNextPrev = this.handleNextPrev.bind(this);
  }

  handleNextPrev(e) {
    if (e.keyCode === 37) {
      this.slider.slickPrev();
    } else if (e.keyCode === 39) {
      this.slider.slickNext();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleNextPrev, true);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleNextPrev, true);
  }

  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      swipeToSlide: true,
      arrows: false
    };
    return (
      <StyledCarousel>
        <Slider {...settings} ref={slider => (this.slider = slider)}>
          {this.props.children}
        </Slider>
        <div className="arrows">
          <button className="leftArrow" onClick={() => this.slider.slickPrev()}>
            <FaArrowLeft size="1.8em"/>
          </button>
          <button className="rightArrow" onClick={() => this.slider.slickNext()}>
            <FaArrowRight size="1.8em"/>
          </button>
        </div>
      </StyledCarousel>
    );
  }
}
