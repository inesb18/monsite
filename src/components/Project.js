import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';

const StyledProject = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .infos {
    opacity: 0;
    transition: all 0.1s;
    padding: 2rem 1rem;
    display: grid;
    align-items: center;
    grid-template-rows: auto 1fr 1fr 1fr;
    grid-gap: 1rem;
    justify-content: center;
    text-align: center;
    h2 {
      font-family: "Philosopher";
      font-size: 3.2rem;
      margin: 0;
      font-weight: bold;
    }
    p {
      margin: 0;
    }
    a {
      font-weight: bold;
      margin: 0 auto;
      width: fit-content;
      padding: 1rem;
      color: ${props => props.theme.peach};
      border-top: 4px solid ${props => props.theme.peach};
      border-bottom: 4px solid ${props => props.theme.peach};
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
  &.visible {
    background: white;
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${props => props.image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;  background-size: cover;
    .infos {
      transition: all 0.8s;
      opacity: 1;
    }
  }
  @media (max-width: 768px) {
    .infos {
      font-size: 1.4rem;
      padding: 1rem;
      grid-gap: 0.6rem;
    }
  }
`;

function useInfoVisible(initialIsVisible) {
  const [isInfoVisible, setInfoVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setInfoVisible(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setInfoVisible(false);
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

  return { ref, isInfoVisible, setInfoVisible };
}


const Project = ({ project }) => {
  const {
    ref,
    isInfoVisible,
    setInfoVisible
  } = useInfoVisible(false);

  const showInfo = () => {
    setInfoVisible(true);
  };

  const hideInfo = () => {
    setInfoVisible(false);
  };

  const toggleInfo = () => {
    setInfoVisible(!isInfoVisible);
  };

  // const optimizedImage = project.image[0].replace(project.image[0].match(/upload\/(.+)\/MonSite/)[1],`q_auto,f_auto,c_fit,w_800`);

  return (
    <StyledProject image={project.image} ref={ref}
      onClick={toggleInfo}
      onMouseEnter={showInfo}
      onMouseLeave={hideInfo}
      className={ isInfoVisible ? "visible" : ""}
    >
      <div className="infos">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <a href={project.URL} target="_blank" rel="noopener noreferrer">SITE WEB</a>
        <ul>
          {project.roles.map((role)=> {
            return(<li key={role}>{role}</li>);
          })}
        </ul>
      </div>
    </StyledProject>
  )
}

export default Project
