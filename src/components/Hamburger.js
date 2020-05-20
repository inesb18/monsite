import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';

import CustomLink from './CustomLink';
import delayUnmounting from './delayUnmounting';

const StyledHamburgerMenu = styled.div`
  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes slideOut {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  animation: ${props => props.isMounted ? 'slideIn' : 'slideOut'} 0.3s linear;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.veryLightPeach};
  height: 100vh;
  width: 100vw;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      margin-bottom: 0.6rem;
      font-size: 1.8rem;
      text-align: center;
      .active {
        color: ${props => props.theme.darkPeach};
      }
      a:not(.active) {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(
            to right,
            ${props => props.theme.darkPeach},
            ${props => props.theme.darkPeach} 50%,
            ${props => props.theme.black} 50%);
            background-size: 200% 100%;
            background-position: 100%;
      }
      a:not(.active):hover {
        transition: all 0.3s cubic-bezier(0.000, 0.000, 0.230, 1);
        background-position: 0%;
      }
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

class HamburgerMenu extends React.Component {

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = "visible";
  }

  render() {
    const section = this.props.section;
    const menuItems = this.props.menuItems;
    return (
      <StyledHamburgerMenu isMounted={this.props.isMounted}>
        <ul>
          {menuItems.map((menuItem) => {
            return (
              <li key={menuItem.label} >
                <CustomLink
                  linkType={menuItem.linkType}
                  linkURL={menuItem.URL}
                  className={ section === menuItem.label ? "active" : ""}
                >
                  {menuItem.label}
                </CustomLink>
              </li>
            )
          })}
        </ul>
      </StyledHamburgerMenu>
    )
  }
}
const DelayedHambergerMenu = delayUnmounting(HamburgerMenu);

function useMenuOpen(initialIsVisible) {
  const [isMenuOpen, setMenuOpen] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setMenuOpen(false);
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

  return { ref, isMenuOpen, setMenuOpen };
}

const StyledHamburger = styled.button `
  margin-right: ${props => props.theme.outPadding};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  &:focus {
    outline: none;
  }
  div {
    width: 2rem;
    height: 0.28rem;
    background: ${props => props.theme.peach};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ isMenuOpen }) => isMenuOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }
    :nth-child(2) {
      opacity: ${({ isMenuOpen }) => isMenuOpen ? '0' : '1'};
      transform: ${({ isMenuOpen }) => isMenuOpen ? 'translateX(20px)' : 'translateX(0)'};
    }
    :nth-child(3) {
      transform: ${({ isMenuOpen }) => isMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const Hamburger = ({ section, menuItems }) => {
  const {
    ref,
    isMenuOpen,
    setMenuOpen
  } = useMenuOpen(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <StyledHamburger ref={ref} isMenuOpen={isMenuOpen} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
      </StyledHamburger>

      <DelayedHambergerMenu delayTime={300} isMounted={isMenuOpen} section={section} menuItems={menuItems}/>
    </div>
  )
}

export default Hamburger
