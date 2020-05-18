import React from "react"
import styled from 'styled-components';

const StyledTitle = styled.h1 `
  height: fit-content;
  white-space: ${props => props.size === "small" ? "normal" : "nowrap"};
  font-size: ${props => props.size === "small" ? "4rem" : "6.7rem"};
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
      height: 6rem;
    }
  }
`;


const PageTitle  = ({ title, size }) => {
  return (
    <StyledTitle size={size}>{title}</StyledTitle>
  )
}

export default PageTitle
