import React from "react";
import styled from 'styled-components';
import { graphql } from "gatsby"

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import { Link } from "gatsby";

const StyledCat = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${props => props.side === 'right' ? "30% auto" : "auto 30%"};
  align-items: flex-end;
  grid-gap: 2rem;
  margin-bottom: 4rem;
  &:last-child {
    margin-bottom: 0;
  }
  img {
    width: 100%;
    max-width: 800px;
    -webkit-filter: drop-shadow(20px 20px 0 ${props => props.theme.veryLightPeach});
    filter: drop-shadow(20px 20px 0 ${props => props.theme.veryLightPeach});
    &:hover {
      -webkit-filter: drop-shadow(20px 20px 0 ${props => props.theme.lightPeach});
      filter: drop-shadow(20px 20px 0 ${props => props.theme.lightPeach});
    }
  }
  h2 {
    font-weight: normal;
    width: 100%;
    margin-bottom: 1rem;
    text-align: right;
    position: relative;
    padding-bottom: 1rem;
    font-size: 2.4rem;
    &:after {
      position: absolute;
      right: ${props => props.side === 'right' ? "0" : "auto"};
      left: ${props => props.side === 'left' ? "0" : "auto"};
      bottom: 0;
      content: "";
      background: ${props => props.theme.peach};
      width: 40%;
      height: 6px;
    }
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;


const Photography = ({ data }) => {
  const categories = data.categories.edges;
  return (
    <Page section="Photographie">
      <PageTitle title="Photographie"/>
      <div>
        {categories.map(({ node }, i) => {
          if (i%2 === 0) {
            return (
              <StyledCat side='right' key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  <h2>
                      {node.frontmatter.title}
                  </h2>
                </Link>
                <Link to={node.fields.slug}>
                  <img src={node.frontmatter.coverPicture} alt={node.frontmatter.title}/>
                </Link>
              </StyledCat>
            )
          } else {
            return(
              <StyledCat side='left' key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  <img src={node.frontmatter.coverPicture} alt={node.frontmatter.title}/>
                </Link>
                <Link to={node.fields.slug}>
                  <h2>
                      {node.frontmatter.title}
                  </h2>
                </Link>
              </StyledCat>
            )
          }
        })}
      </div>
    </Page>
  )
}

export default Photography

export const pageQuery = graphql`
  query {
    categories: allMarkdownRemark(filter: {fields: {slug: {regex: "/^/photographie/.*$/"}}}, sort: {order: ASC, fields: frontmatter___order}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            coverPicture
            title
          }
        }
      }
    }
  }
`
