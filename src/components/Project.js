import React, { useState } from "react";
import styled from 'styled-components';

const StyledProject = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 30rem;
  .infos {
    height: 100%;
    min-height: 30rem;
    opacity: 0;
    pointer-events: none;
    transition: all 0.1s;
    padding: 3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    > * {
      padding-bottom: 1rem;
      &:last-child {
        padding-bottom: 0;
      }
    }
    h2 {
      font-family: "Philosopher";
      font-size: 3.2rem;
      margin: 0;
      font-weight: bold;
    }
    p {
      margin: 0;
    }
    .link {
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
  @media (max-width: 768px) {
    .infos {
      font-size: 1.4rem;
      padding: 2rem;
      > * {
      padding-bottom: 0.6rem;
      &:last-child {
        padding-bottom: 0;
      }
    }
    }
  }
  @media (hover: hover) {
    &.visibleFromHover {
      background: white;
      background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${props => props.image});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;  background-size: cover;
      .infos {
        pointer-events: auto;
        transition: all 0.8s;
        opacity: 1;
      }
    }
  }
  @media (hover: none) {
    &.visibleFromClick {
      background: white;
      background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${props => props.image});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;  background-size: cover;
      .infos {
        pointer-events: auto;
        transition: all 0.8s;
        opacity: 1;
      }
    }
  }
`;

const Project = ({ project, lang }) => {
  const [isInfoVisibleFromHover, setInfoVisibleFromHover] = useState(false);

  const showInfoFromHover = () => {
    setInfoVisibleFromHover(true);
  };

  const hideInfoFromHover = () => {
    setInfoVisibleFromHover(false);
  };

  const [isInfoVisibleFromClick, setInfoVisibleFromClick] = useState(false);

  const toggleInfoFromClick = () => {
    setInfoVisibleFromClick(!isInfoVisibleFromClick);
  };

  const classes = () => {
    let classes = "";
    if (isInfoVisibleFromClick) {
      classes += "visibleFromClick";
    }
    if (isInfoVisibleFromHover) {
      classes += " visibleFromHover";
    }
    return classes;
  }

  return (
    <StyledProject image={project.image}
      onClick={toggleInfoFromClick}
      onMouseEnter={showInfoFromHover}
      onMouseLeave={hideInfoFromHover}
      className={classes()}
    >
      <div className="infos">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        { project.URL ?
          <a href={project.URL} target="_blank" rel="noopener noreferrer" className="link">{lang ==="fr" ? "SITE WEB" : "WEBSITE"}</a>
          : <p className="link">{lang ==="fr" ? "Lien à venir" : "Link coming soon"}</p>
        }
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
