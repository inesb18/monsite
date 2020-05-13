import React from "react";
import styled from 'styled-components';

import Page from "../components/Page";
import CustomLink from '../components/CustomLink';


const StyledBlock = styled.div `
  background: ${props => props.theme.peach};
  padding: 2.8rem;
  color: white;
  min-width: fit-content;
  width: 45rem;
  max-width: 100%;
  h1 {
    margin: 0 0 10rem 0;
    font-weight: bold;
    font-size: 4rem;
  }
  .block_infos {
    display: flex;
    p {
      margin-right: 1rem;
    }
    p, h2 {
      font-size: 2rem;
      margin-top: 0;
      margin-bottom: 0;
      font-weight: normal;
    }
    h2:last-child:before {
      content:"& ";
    }
  }
  @media (max-width: 768px) {
    padding: 1.6rem;
    h1 {
      font-size: 3.2rem
    }
    .block_infos {
      p, h2 {
        font-size: 1.6rem;
      }
    }
  }
`;

const StyledLinks = styled.div `
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 3rem;
  .home_linkPortfolio, .home_LinkAbout {
    display: block;
  }
  .home_linkPortfolio {
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    &:after {
      position: absolute;
      right: 0;
      bottom: 0;
      content: "";
      background: ${props => props.theme.peach};
      width: 100px;
      height: 6px;
    }
  }
  .home_linkAbout {
    color: ${props => props.theme.darkPeach};
    margin-top: 2rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const IndexPage = ({ data }) => {
  const block = data.home.edges[0].node.frontmatter.block;
  const links = data.home.edges[0].node.frontmatter.links;
  const linkToAbout = data.home.edges[0].node.frontmatter.linkToAbout;
  return (
    <Page section="Accueil">
      <StyledBlock>
        <h1>{block.name}</h1>
        <div className="block_infos">
          <p>{block.keenOn}{` `}</p>
          <div>
            {block.fields.map((field) => {
              return(
                <h2 key={field}>{field}</h2>
              )
            })}
          </div>
        </div>
      </StyledBlock>
      <StyledLinks>
        {links.map((link) => {
          return (
            <CustomLink className="home_linkPortfolio" key={link.label} linkURL={link.URL} linkType={link.linkType} >
              {link.label}
            </CustomLink>
          )
        })}
        <CustomLink className="home_linkAbout" key={linkToAbout.label} linkURL={linkToAbout.URL} linkType={linkToAbout.linkType} >
            {linkToAbout.label}
        </CustomLink>
      </StyledLinks>
    </Page>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    home: allMarkdownRemark(filter: {fields: {slug: {eq: "/"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            block {
              fields
              keenOn
              name
            }
            linkToAbout {
              URL
              label
              linkType
            }
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
`
