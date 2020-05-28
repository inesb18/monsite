import React from "react";
import styled from 'styled-components';
import { graphql } from "gatsby"
import { Image, Transformation } from 'cloudinary-react';

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
    -webkit-filter: drop-shadow(2rem 2rem 0 ${props => props.theme.veryLightPeach});
    filter: drop-shadow(2rem 2rem 0 ${props => props.theme.veryLightPeach});
    &:hover {
      -webkit-filter: drop-shadow(2rem 2rem 0 ${props => props.theme.lightPeach});
      filter: drop-shadow(2rem 2rem 0 ${props => props.theme.lightPeach});
    }
  }
  h2 {
    font-weight: normal;
    width: 100%;
    margin-bottom: 1rem;
    text-align: ${props => props.side === 'right' ? "right" : "left"};
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
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 1.4rem;
    }
    img {
      -webkit-filter: drop-shadow(1rem 1rem 0 ${props => props.theme.veryLightPeach});
      filter: drop-shadow(1rem 1rem 0 ${props => props.theme.veryLightPeach});
      &:hover {
        -webkit-filter: drop-shadow(1rem 1rem 0 ${props => props.theme.lightPeach});
        filter: drop-shadow(1rem 1rem 0 ${props => props.theme.lightPeach});
      }
    }
  }
  @media (hover: hover) {
    img {
      transition: all 0.4s;
    }
  }
`;


const Photography = ({ data }) => {
  const page = data.allContentfulPagePhoto.edges[0].node;
  const categories = page.catgoriesPhoto;
  return (
    <Page section={page.nomDansNavbar} lang={page.node_locale} slug={page.slug} title={page.seoTitre} description={page.seoDescription}>
      <PageTitle title={page.titre}/>
      <div>
        {categories.map((categorie, i) => {
          const photoID = 'Mon%20Site' + categorie.photoDeCouverture[0].secure_url.match(/Mon%20Site(.+)/)[1];
          const locale = page.node_locale === 'fr' ? '' : `en/`;
          const completeSlug = `/${locale}${categorie.slug}`;
          if (i%2 === 0) {
            return (
              <StyledCat side='right' key={categorie.titre}>
                <Link to={completeSlug}>
                  <h2>
                      {categorie.titre}
                  </h2>
                </Link>
                <Link to={completeSlug}>
                  <Image cloudName="dfzwvorfr" publicId={photoID} alt={categorie.titre} secure="true">
                    <Transformation quality="auto" fetch_format="auto" width="800" crop="fit"/>
                  </Image>
                </Link>
              </StyledCat>
            )
          } else {
            return(
              <StyledCat side='left' key={categorie.titre}>
                <Link to={completeSlug}>
                  <Image cloudName="dfzwvorfr" publicId={photoID} alt={categorie.titre} secure="true">
                    <Transformation quality="auto" fetch_format="auto" width="800" crop="fit"/>
                  </Image>
                </Link>
                <Link to={completeSlug}>
                  <h2>
                      {categorie.titre}
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
  query($id: String!) {
    allContentfulPagePhoto(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          node_locale
          nomDansNavbar
          titre
          catgoriesPhoto {
            titre
            slug
            photoDeCouverture {
              secure_url
            }
          }
          seoTitre
          seoDescription
        }
      }
    }
  }
`
