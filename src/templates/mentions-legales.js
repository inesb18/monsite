import React from "react";

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";


const MentionsLegales = ({ data }) => {
  return (
    <Page lang="fr" title={data.allContentfulPageMentionsLegales.edges[0].node.seoTitre} description="Mentions légales du site.">
      <PageTitle size="small" title="Mentions légales"/>
      <div dangerouslySetInnerHTML={{ __html: data.allContentfulPageMentionsLegales.edges[0].node.texte.childMarkdownRemark.html }}/>
    </Page>
  )
}

export default MentionsLegales

export const pageQuery = graphql`
  query($id: String!) {
    allContentfulPageMentionsLegales (filter: { id: { eq: $id } }) {
      edges {
        node {
          seoTitre
          texte {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
