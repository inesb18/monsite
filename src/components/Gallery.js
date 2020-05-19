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

const StyledGallery = styled.div`
  .loading {
    display: ${ props => props.visible ? "none" : "block"};
  }
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
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setModalOpen(false);
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

  const [currentPic, setCurrentPic] = useState(0);

  const toggleModal = (i = 0) => {
    setModalOpen(!isModalOpen);
    if (isModalOpen) {
      setCurrentPic(i);
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const childElements = photos.map((photo, i) => {
    const optimizedImage = photo[0].replace(photo[0].match(/upload\/(.+)\/MonSite/)[1],`q_auto,f_auto,c_fit,w_800`);
    return (
      <StyledImage key={photo[0]} src={optimizedImage} alt={alt} onClick={() => toggleModal(i)}/>
    );
  });

  const handleImagesLoaded = () => {
    setVisible(true);
  }

  return (
      <StyledGallery visible={visible}>
        <p className="loading">Loading...</p>
        <Masonry
          className="masonry"
          onImagesLoaded={handleImagesLoaded}
        >
          {childElements}
        </Masonry>
        <StyledModal show={isModalOpen}>
          <div className="modalHeader">
            <h2>{alt}</h2>
            <div className="closeButton" onClick={toggleModal}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <SimpleSlider slickGoTo={currentPic}>
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
