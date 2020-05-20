import React from 'react';
import styled from 'styled-components';

const StyledSliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
  display: flex;
`

const SliderContent = (props) => {
  return (
    <StyledSliderContent {...props} className="SliderContent"/>
  )
}

export default SliderContent
