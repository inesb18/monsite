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
  const about = data.allContentfulPageAPropos.edges[0].node;
  return (
    <Page section={about.nomDansNavbar} lang={about.node_locale} slug={about.slug}>
      <StyledHeaderAbout>
        <PageTitle title={about.titre}/>
        <div className="photo">
          <img src={about.photo.resize.src} alt="Inès Belghiti"/>
        </div>
      </StyledHeaderAbout>
      <StyledText dangerouslySetInnerHTML={{ __html: about.texte.texte }} />
    </Page>
  )
}

export default About

export const pageQuery = graphql`
  query($id: String!) {
    allContentfulPageAPropos(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          node_locale
          titre
          texte {
            texte
          }
          photo {
            resize(jpegProgressive: false, width: 600, quality: 100) {
              src
            }
          }
          nomDansNavbar
        }
      }
    }
  }
`

