import React, { useEffect } from "react";
import styled from 'styled-components';

const StyledModal = styled.div`
  z-index: 3;
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .modalHeader {
    height: 8rem;
    h2 {
      padding: 2rem 2.2rem;;
      margin: 0;
      font-weight: normal;
      text-align: center;
    }
  }
  .closeButton {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2rem;
    cursor: pointer;
    > div {
      height: 2rem;
      width: 4px;
      margin-left: 1rem;
      background-color: ${props => props.theme.peach};
      transform: rotate(45deg);
      Z-index: 1;
      > div {
        height: 2rem;
        width: 4px;
        background-color: ${props => props.theme.peach};
        transform: rotate(90deg);
        Z-index: 2;
      }
    }
  }
  @media (max-width: 768px) {
    .modalHeader h2 {
      font-size: 1.8rem;
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
          <div className="closeButton" onClick={closeMethod}>
            <div>
              <div></div>
            </div>
          </div>
          <h2>{title}</h2>
        </div>
        {children}
      </StyledModal>
  )
}

export default Modal

