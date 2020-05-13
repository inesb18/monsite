import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components';

import CustomLink from './CustomLink';

const StyledFooter = styled.footer `
  padding: ${props => props.theme.outPadding};
  background: ${props => props.theme.lightPeach};
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  .footer_left {
    p {
      margin: 0;
    }
  }
  .footer_right {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: right;
  }
  @media (max-width: 768px) {
    padding: ${props => props.theme.outPaddingSmall};
    font-size: 1.2rem;
  }
`;


const Footer  = ({ section }) => {
  const data = useStaticQuery(graphql`
    query {
      footer: allMarkdownRemark(filter: {fields: {slug: {eq: "/footer/"}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              rightsAndCredits
              links {
                URL
                label
                linkType
              }
            }
          }
        }
      }
    }
  `)
  const rightsAndCredits = data.footer.edges[0].node.frontmatter.rightsAndCredits;
  const links = data.footer.edges[0].node.frontmatter.links;
  return (
    <StyledFooter>
      <div className="footer_left">
        {rightsAndCredits.map((line) => {
          return (
            <p key={line} >{line}</p>
          )
        })}
      </div>
      <ul className="footer_right">
        {links.map((link) => {
          return (
            <li key={link.label}>
              <CustomLink
                linkType={link.linkType}
                linkURL={link.URL}
              >
                {link.label}
              </CustomLink>
            </li>
          )
        })}
      </ul>

    </StyledFooter>
  )
}

export default Footer
