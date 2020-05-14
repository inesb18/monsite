import React from "react"
import styled from 'styled-components';

const StyledTitle = styled.h1 `
  height: fit-content;
  white-space: nowrap;
  font-size: 6.7rem;
  margin-top: 0;
  position: relative;
  &:after {
    content: "";
    background: ${props => props.theme.veryLightPeach};
    position: absolute;
    top: 50%;
    left: -100vw;
    width: 160vw;
    height: 12rem;
    z-index: -1;
  }
  @media (max-width: 768px) {
    font-size: 4rem;
    &:after {
      height: 8rem;
    }
  }
`;


const PageTitle  = ({ title }) => {
  return (
    <StyledTitle>{title}</StyledTitle>
  )
}

export default PageTitle
