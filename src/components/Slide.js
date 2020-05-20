import React from 'react';
import styled from 'styled-components';

const StyledSlide = styled.div`
  height: 100;
  width: 100%;
  background-image: url(${props => props.content});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Slide = ({ content }) => {
  return (
    <StyledSlide content={content}/>
  )
}
export default Slide
