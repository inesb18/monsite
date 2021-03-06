import React, { useState, useRef, useEffect } from "react";
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

// import SimpleSlider from './SimpleSlider';
import Slider from '../components/Slider';
import Modal from './Modal';

const StyledImage = styled.img`
  cursor: pointer;
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

const Gallery = ({ photos, photosSlider, alt }) => {
  const [visible, setVisible] = useState(false);
  const [currentPic, setCurrentPic] = useState();
  const {
    isModalOpen,
    setModalOpen
  } = useModalOpen(false);

  const openModal = (i) => {
    setCurrentPic(i);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const childElements = photos.map((photo, i) => {
    return (
      <StyledImage key={photo} src={photo} alt={alt} onClick={() => openModal(i)}/>
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
        {
          isModalOpen &&
          <Modal title= {alt} closeMethod={closeModal}>
            <Slider slides={photosSlider} initialSlide={currentPic}/>
          </Modal>
        }
      </StyledGallery>
  )
}

export default Gallery
