import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import SliderContent from './SliderContent';
import Slide from './Slide';
import Arrow from './Arrow';

const StyledSlider = styled.div`
  position: relative;
  height: calc(100vh - 8rem - 6rem);
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const StyledArrows = styled.div`
  display: flex;
  justify-content: center;
`;

const getWidth = () => window.innerWidth;

const Slider = (props) => {
  const { slides } = props;
  const initialSlide = props.initialSlide || 0;

  const firstSlide = slides[0]
  const secondSlide = slides[1]
  const lastSlide = slides[slides.length - 1]

  const getSlides = (index) => {
    let slidesFromIndex = [];
    if (index === slides.length - 1) {
      slidesFromIndex = [slides[slides.length - 2], lastSlide, firstSlide]
    }
    else if (index === 0) {
      slidesFromIndex = [lastSlide, firstSlide, secondSlide]
    }
    else {
      slidesFromIndex = slides.slice(index - 1, index + 2)
    }
    return slidesFromIndex;
  }

  const [state, setState] = useState({
    activeSlide: initialSlide,
    translate: getWidth(),
    transition: 0.45,
    _slides: getSlides(initialSlide)
  })

  const { translate, transition, activeSlide, _slides } = state;

  const transitionRef = useRef();
  const resizeRef = useRef();
  const keydownRef = useRef();


  useEffect(() => {
    transitionRef.current = smoothTransition
    resizeRef.current = handleResize
    keydownRef.current = handleKeydown
  })

  useEffect(() => {
    const smooth = (e) => {
      if (e.target.className.includes('SliderContent')) {
        transitionRef.current();
      }
    }
    const resize = () => {
      resizeRef.current();
    }
    const keydown = (e) => {
      keydownRef.current(e);
    }
    const transitionEnd = window.addEventListener('transitionend', smooth);
    const onResize = window.addEventListener('resize', resize);
    const onKeydown = window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('transitionend', transitionEnd);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeydown);
    }
  }, [])

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 })
  }, [transition])

  const nextSlide = () => {
    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    })
  }

  const smoothTransition = () => {
    setState({
      ...state,
      _slides: getSlides(activeSlide),
      transition: 0,
      translate: getWidth()
    })
  }

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 })
  }

  const handleKeydown = (e) => {
    if (e.keyCode === 37) {
      prevSlide();
    } else if (e.keyCode === 39) {
      nextSlide();
    }
  };

  const prevSlide = () => {
    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    })
  }

  return (
    <div>
      <StyledSlider>
        <SliderContent
          translate={translate}
          transition={transition}
          width={getWidth()*_slides.length}
        >
          {_slides.map((slide, i) => (
            <Slide key={slide + i} content={slide} />
          ))}
        </SliderContent>
      </StyledSlider>
      <StyledArrows>
        <Arrow direction="left" handleClick={prevSlide} />
        <Arrow direction="right" handleClick={nextSlide}/>
      </StyledArrows>
    </div>
  )
}

export default Slider

