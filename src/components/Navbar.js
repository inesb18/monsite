import React from "react";
import styled from 'styled-components';

import CustomLink from './CustomLink';

const StyledListMenu = styled.ul `
  border-bottom: 4px solid ${props => props.theme.peach};
  padding: 0 ${props => props.theme.outPadding} 0 ${props => props.theme.outPadding};
  margin: 0;
  height: ${props => props.theme.heightHeader};
  list-style: none;
  display: flex;
  align-items: center;
  li {
    font-size: 1.8rem;
    margin-right: 8rem;
    &:last-child {
      margin-right: 0;
    }
    .active {
      color: ${props => props.theme.darkPeach};
    }
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
