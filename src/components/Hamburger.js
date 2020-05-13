import { Link } from "gatsby"
import React, { useState, useRef, useEffect } from "react";
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';


class HamburgerMenu extends React.Component {
  render() {
    const section = this.props.section;
    const menuItems = this.props.menuItems;
    return (
      <div>HELLO</div>
    )
  }
}

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

const StyledHamburger = styled.div `
  padding-right: ${props => props.theme.outPadding};
  color: ${props => props.theme.peach};
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
    <StyledHamburger>
      <div ref={ref}>
        <GiHamburgerMenu onClick={toggleMenu} className="hamburgerButton" size="2.5rem"/>
      </div>
      {isMenuOpen && <HamburgerMenu section={section} menuItems={menuItems}/>}
    </StyledHamburger>
  )
}

export default Hamburger
