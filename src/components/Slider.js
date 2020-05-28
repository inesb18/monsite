import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Swipe from 'react-easy-swipe';

import SliderContent from './SliderContent';
import Slide from './Slide';
import Arrow from './Arrow';

const StyledSlider = styled.div`
  position: relative;
  height: calc(100vh - 8rem - 6rem);
  width: min(1600px, 100%);
  margin: 0 auto;
  overflow: hidden;
  @media screen and (orientation: landscape) and (max-width: 768px) {
    height: calc(100vh - 8rem - 1rem);
  }
`;

const StyledArrows = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  @media screen and (orientation: landscape) and (max-width: 768px) {
    justify-content: space-between;
    width: 100vw;
    position: absolute;
    top: calc(50% - 3rem);
  }
  @media screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Slider = (props) => {
  const getWidth = () => {
    if (typeof window !== `undefined`) {
      return Math.min(window.innerWidth, 1600);
    } else {
      return(1600);
    }
  };

  const { slides } = props;
  const initialSlide = props.initialSlide || 0;

  const [state, setState] = useState({
    activeSlide: initialSlide,
    translate: getWidth() * initialSlide,
    transition: 0.45,
  })

  const { translate, transition, activeSlide } = state;

  const resizeRef = useRef();
  const keydownRef = useRef();


  useEffect(() => {
    resizeRef.current = handleResize
    keydownRef.current = handleKeydown
  })

  useEffect(() => {
    const resize = () => {
      resizeRef.current();
    }
    const keydown = (e) => {
      keydownRef.current(e);
    }
    const onResize = window.addEventListener('resize', resize);
    const onKeydown = window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeydown);
    }
  }, [])

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 })
  }, [transition])


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

  const nextSlide = () => {
    if (activeSlide !== slides.length - 1) {
      setState({
        ...state,
        translate: (activeSlide + 1) * getWidth(),
        activeSlide: activeSlide + 1
      })
    }
  }

  const prevSlide = () => {
    if (activeSlide !== 0) {
      setState({
        ...state,
        translate: (activeSlide - 1) * getWidth(),
        activeSlide: activeSlide - 1
      })
    }
  }

  return (
    <div style={{position: 'relative'}}>
      <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
        <StyledSlider>
          <SliderContent
            translate={translate}
            transition={transition}
            width={getWidth()*slides.length}
          >
            {slides.map((slide, i) => (
                <Slide key={slide + i} content={slide} />
            ))}
          </SliderContent>
        </StyledSlider>
      </Swipe>
      <StyledArrows>
        <Arrow className={state.activeSlide === 0 ? "hidden allo" : "allo"} direction="left" handleClick={prevSlide} />
        <Arrow className={state.activeSlide === slides.length - 1 ? "hidden" : ""} direction="right" handleClick={nextSlide}/>
      </StyledArrows>
    </div>
  )
}

export default Slider

