import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components';


import Navbar from "./Navbar"
import Hamburger from "./Hamburger"

const StyledHeader = styled.header `
  width: 100%;
  height: ${props => props.theme.heightHeader};
  background: white;
  position: fixed;
  z-index: 2;
  padding: 0 0 0 ${props => props.theme.outPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 4rem;
  }
  @media (max-width: 768px) {
    height: ${props => props.theme.heightHeaderSmall};
    .logo {
      height: 3rem;
    }
  }
`;


const Header  = ({ section }) => {
  const data = useStaticQuery(graphql`
    query {
      nav: allMarkdownRemark(filter: {fields: {slug: {eq: "/navbar/"}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              menuItems {
                URL
                label
                linkType
              }
              logo
            }
          }
        }
      }
    }
  `)
  const logoPath = data.nav.edges[0].node.frontmatter.logo;
  const menuItems = data.nav.edges[0].node.frontmatter.menuItems;
  return (
    <StyledHeader>
      <Link to="/">
        <img
          className="logo"
          src={logoPath}
          alt="logo"
        />
      </Link>
      <nav>
        <Navbar section={section} menuItems={menuItems}/>
        <Hamburger section={section} menuItems={menuItems}/>
      </nav>
    </StyledHeader>
  )
}

export default Header
