import React from "react";
import { graphql } from "gatsby"
import styled from 'styled-components';

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";

const StyledHeaderAbout = styled.div`
  margin-bottom: 3rem;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  h1 {
    margin-right: 2rem;
    flex-grow: 0;
  }
  .photo {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    img {
      width: 100%;
      max-width: 600px;
    }
  }
`;

const StyledText = styled.div`
  padding: 2rem;
  width: 65%;
  margin: 0 auto;
  text-align: justify;
  background: ${props => props.theme.veryLightPeach};
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    width: 90%;
    font-size: 1.4rem;
    padding: 1.4rem;
  }
`;

const About = ({ data }) => {
  const photo = data.about.edges[0].node.frontmatter.photo;
  const contentHTML = data.about.edges[0].node.html;
  return (
    <Page section="À propos">
      <StyledHeaderAbout>
        <PageTitle title="À propos"/>
        <div className="photo">
          <img src={photo.image} alt={photo.imageAlt}/>

        </div>
      </StyledHeaderAbout>
      <StyledText dangerouslySetInnerHTML={{ __html: contentHTML }} />
    </Page>
  )
}

export default About

export const pageQuery = graphql`
  query {
    about: allMarkdownRemark(filter: {fields: {slug: {eq: "/a-propos/"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            photo {
              image
              imageAlt
            }
          }
        html
        }
      }
    }
  }
`
