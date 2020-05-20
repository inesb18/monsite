import React, { useState, useRef, useEffect } from "react";
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

import SimpleSlider from './SimpleSlider';

const StyledImage = styled.img`
  width: 50%;
  padding: 0.3rem;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.2rem;
  }
`;

const StyledLoading = styled.p`
  width: fit-content;
  display: ${ props => props.visible ? "none" : "block"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(
      to right,
      ${props => props.theme.darkPeach},
      ${props => props.theme.darkPeach} 50%,
      ${props => props.theme.black} 50%);
  background-size: 200% 100%;
  animation: fillIn 1s linear infinite;
  @keyframes fillIn {
    0% {
      background-position: 100%;
    }
    10% {
      background-position: 100%;
    }
    50% {
      background-position: 0%;
    }
    100% {
      background-position: 0%;
    }
  }
`;

const StyledGallery = styled.div`
  .masonry {
    visibility: ${ props => props.visible ? "visible" : "hidden"};
  }
`;

const StyledModal = styled.div`
  display: ${props => props.show ? "block" : "none"};
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


function useModalOpen(initialIsVisible) {
  const [isModalOpen, setModalOpen] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setModalOpen(false);
      document.body.style.overflow = "visible";
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setModalOpen(false);
      document.body.style.overflow = "visible";
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isModalOpen, setModalOpen };
}

const Gallery = ({ photos, alt }) => {
  const [visible, setVisible] = useState(false);
  const {
    ref,
    isModalOpen,
    setModalOpen
  } = useModalOpen(false);

  const sliderRef = useRef();

  const openModal = (i) => {
    sliderRef.current.goTo(i, true);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "visible";
  };

  const childElements = photos.map((photo, i) => {
    const optimizedImage = photo[0].replace(photo[0].match(/upload\/(.+)\/MonSite/)[1],`q_auto,f_auto,c_fit,w_800`);
    return (
      <StyledImage key={photo[0]} src={optimizedImage} alt={alt} onClick={() => openModal(i)}/>
    );
  });

  const handleImagesLoaded = () => {
    setVisible(true);
  }

  return (
      <StyledGallery visible={visible}>
        <StyledLoading visible={visible}>Chargement...</StyledLoading>
        <Masonry
          className="masonry"
          onImagesLoaded={handleImagesLoaded}
        >
          {childElements}
        </Masonry>
        <StyledModal show={isModalOpen}>
          <div className="modalHeader">
            <h2>{alt}</h2>
            <div className="closeButton" onClick={closeModal}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <SimpleSlider ref={sliderRef}>
            {
              photos.map((photo) => {
                const optimizedImage = photo[0].replace(photo[0].match(/upload\/(.+)\/MonSite/)[1],`q_auto,f_auto,c_fit,w_1500`);
                return (
                  <div key={photo[0]} className="imageSlideWrap" >
                    <img src={optimizedImage} alt={alt} className="imageSlider" />
                  </div>
                );
              })
            }
          </SimpleSlider>
        </StyledModal>
      </StyledGallery>
  )
}

export default Gallery
