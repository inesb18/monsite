import React, { useEffect } from "react";
import styled from 'styled-components';

const StyledModal = styled.div`
  z-index: 3;
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  padding: 2rem;
  height: 100%;
  width: 100%;
  .modalHeader {
    display: flex;
    justify-content: space-between;
    h2 {
      margin: 0;
      font-weight: normal;
    }
  }
  .closeButton {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    > div {
      width: 2rem;
      height: 0.28rem;
      background: ${props => props.theme.peach};
      border-radius: 10px;
      transform-origin: 1px;
      :first-child {
        transform: rotate(45deg);
      }
      :nth-child(2) {
        opacity: 0;
      }
      :last-child {
        transform: rotate(-45deg);
      }
    }
  }
`;

const Modal = ({ title, children, closeMethod }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return function cleanup() {
      document.body.style.overflow = "visible";
    };
  });

  return (
      <StyledModal>
        <div className="modalHeader">
          <h2>{title}</h2>
          <div className="closeButton" onClick={closeMethod}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {children}
      </StyledModal>
  )
}

export default Modal

