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


const Header  = ({ section, lang }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulNavbar {
        edges {
          node {
            node_locale
            logo {
              file {
                url
              }
            }
            liensVersAutresPages {
              ... on Node {
                ... on ContentfulPageAPropos {
                  id
                  slug
                  nomDansNavbar
                }
                ... on ContentfulPageTech {
                  id
                  slug
                  nomDansNavbar
                }
                ... on ContentfulPagePhoto {
                  id
                  slug
                  nomDansNavbar
                }
                ... on ContentfulPageAccueil {
                  id
                  nomDansNavbar
                }
              }
            }
          }
        }
      }
    }
  `)
  const navbar = data.allContentfulNavbar.edges.filter(({ node }) => node.node_locale === lang);
  const logo = navbar[0].node.logo.file.url;
  const locale = navbar[0].node.node_locale === 'fr' ? '' : `en/`;
  const menuItems = navbar[0].node.liensVersAutresPages.map((link) => {
    return ({ URL: link.slug ? `/${locale}${link.slug}` : `/${locale}`, label: link.nomDansNavbar, linkType: "internal"})
  })
  return (
    <StyledHeader>
      <Link to={`/${locale}`}>
        <img
          className="logo"
          src={'https:'+logo}
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
