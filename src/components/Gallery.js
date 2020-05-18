import React, { Component, useState } from "react";
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 50%;
  padding: 0.3rem;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.2rem;
  }
`;


const StyledGallery = styled.div`
  visibility: ${ props => props.visible ? "visible" : "hidden"};
  margin: 0 auto;
  max-width: 1600px;
  visibility:
`;


const Gallery = ({ photos, alt }) => {
  const [visible, setVisible] = useState(false);
  const childElements = photos.map((photo) => {
   return (
      <StyledImage key={photo[0]} src={photo[0]} alt={alt}/>
    );
  });
  const handleImagesLoaded = () => {
    setVisible(true);
  }
  return (
      <StyledGallery visible={visible}>
        <Masonry
          className="mansory"
          onImagesLoaded={handleImagesLoaded}
        >
          {childElements}
        </Masonry>
      </StyledGallery>
  )
}

export default Gallery
