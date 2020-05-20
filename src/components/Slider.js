import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import SliderContent from './SliderContent'
import Slide from './Slide'
import Arrow from './Arrow'

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

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide]
  })

  const { translate, transition, activeSlide, _slides } = state;

  const transitionRef = useRef();
  const resizeRef = useRef()


  useEffect(() => {
    transitionRef.current = smoothTransition
    resizeRef.current = handleResize
  })

  useEffect(() => {
    const smooth = (e) => {
      if (e.target.className.includes('SliderContent')) {
        transitionRef.current();
      }
    }
    const resize = () => {
      resizeRef.current()
    }
    const transitionEnd = window.addEventListener('transitionend', smooth)
    const onResize = window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('transitionend', transitionEnd)
      window.removeEventListener('resize', onResize)
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
    let _slides = []

    // We're at the last slide.
    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide]
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2)

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth()
    })
  }

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 })
  }

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

