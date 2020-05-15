import React from "react";
import { graphql } from "gatsby"

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import { Link } from "gatsby";


const Photography = ({ data }) => {
  const categories = data.categories.edges;
  return (
    <Page section="Photographie">
      <PageTitle title="Photographie"/>
      <div>
        {categories.map(({ node }, i) => {
          return (
            <div key={node.fields.slug}>
              <Link to={node.fields.slug}>
                  <h2>{node.frontmatter.title}</h2>
              </Link>
                <img src={node.frontmatter.coverPicture} alt={node.frontmatter.title}/>
            </div>
          )
        })}
      </div>
    </Page>
  )
}

export default Photography

export const pageQuery = graphql`
  query {
    categories: allMarkdownRemark(filter: {fields: {slug: {regex: "/^/photographie/.*$/"}}}) {
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
