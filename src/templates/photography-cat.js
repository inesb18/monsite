import React from "react";
import { graphql } from "gatsby"

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import Gallery from "../components/Gallery";

const PhotographyCat = ({ data }) => {
  const page = data.allContentfulPagePhotoCategorie.edges[0].node;
  const title = page.titre;
  const photos = page.photos.map ((photo) => {
    return photo.secure_url.replace(photo.secure_url.match(/upload\/(.+)\/Mon%20Site/)[1],`q_auto,f_auto,c_fit,w_800`)
  });
  const photosSlider = page.photos.map ((photo) => {
    return photo.secure_url.replace(photo.secure_url.match(/upload\/(.+)\/Mon%20Site/)[1],`q_auto,f_auto,c_fit,w_1600`);
  });
  const section = data.allContentfulPagePhoto.edges.filter(({ node }) => node.node_locale === page.node_locale)[0].node;
  return (
    <Page section={section.nomDansNavbar} lang={page.node_locale} slug={page.slug}>
      <PageTitle size="small" title={title}/>
      <Gallery alt={title} photos={photos} photosSlider={photosSlider}/>
    </Page>
  )
}

export default PhotographyCat

export const pageQuery = graphql`
  query($id: String!) {
    allContentfulPagePhotoCategorie(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          node_locale
          titre
          photos {
            secure_url
          }
        }
      }
    }
    allContentfulPagePhoto {
      edges {
        node {
          node_locale
          nomDansNavbar
        }
      }
    }
  }
`
