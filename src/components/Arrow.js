import React from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const StyledArrow = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: transform ease-in 0.1s;
  transform: translateX(${props => props.direction === 'left' ? '-1' : '1'}rem);
  &:first-child: {
    margin: right: 1rem;
  }
`;

const Arrow = ({ direction, handleClick }) => {
  return(
    <StyledArrow onClick={handleClick} direction={direction}>
      {direction === 'right' ?
      <FaArrowRight size="1.8em"/>
      : <FaArrowLeft size="1.8em"/>}
    </StyledArrow>
  )
}


export default Arrow;
