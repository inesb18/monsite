import React from "react";
import styled from 'styled-components';

import CustomLink from './CustomLink';

const StyledListMenu = styled.ul `
  border-bottom: 6px solid ${props => props.theme.peach};
  padding: 0 ${props => props.theme.outPadding} 0 ${props => props.theme.outPadding};
  margin: 0;
  height: ${props => props.theme.heightHeader};
  list-style: none;
  display: flex;
  align-items: center;
  li {
    white-space: nowrap;
    font-size: 1.8rem;
    margin-right: 8rem;
    &:last-child {
      margin-right: 0;
    }
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
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navbar = ({ section, menuItems }) => {
  return (
    <StyledListMenu>
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
    </StyledListMenu>
  )
}

export default Navbar
