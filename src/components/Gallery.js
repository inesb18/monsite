import React, { useState } from "react";
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
  .loading {
    display: ${ props => props.visible ? "none" : "block"};
  }
  .masonry {
    visibility: ${ props => props.visible ? "visible" : "hidden"};
  }
`;


const Gallery = ({ photos, alt }) => {
  const [visible, setVisible] = useState(false);
  const childElements = photos.map((photo) => {
    const optimizedImage = photo[0].replace(photo[0].match(/upload\/(.+)\/MonSite/)[1],`q_auto,f_auto,c_fit,w_800`);
    return (
      <StyledImage key={photo[0]} src={optimizedImage} alt={alt}/>
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
      </StyledGallery>
  )
}

export default Gallery
