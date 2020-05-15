import React from "react";
import { graphql } from "gatsby"

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";


const Photography = ({ data }) => {
  const title = data.photos.edges[0].node.frontmatter.title;
  const photos = data.photos.edges[0].node.frontmatter.photos;
  return (
    <Page section="Photographie">
      <PageTitle size="small" title={title}/>
      <div>

      </div>
    </Page>
  )
}

export default Photography

export const pageQuery = graphql`
  query($slug: String!) {
    photos: allMarkdownRemark(filter: {fields: {slug: { eq: $slug }}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            photos
          }
        }
      }
    }
  }
`
