import React from "react";
import { graphql } from "gatsby"
import styled from 'styled-components';

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";
import Project from "../components/Project";

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  grid-gap: 6rem;
  grid-auto-rows: 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

const Projects = ({ data }) => {
  const page = data.allContentfulPageTech.edges[0].node;
  const projects = page.projets;
  return (
    <Page section={page.nomDansNavbar} lang={page.node_locale} slug={page.slug} title={page.seoTitre} description={page.seoDescription}>
      <PageTitle title={page.titre}/>
      <StyledProjectsGrid>
        {projects.map((project)=> {
          const formattedProject = { description: project.descriptionCourte,
                                     name: project.nom,
                                     URL: project.url,
                                     roles:  project.roles,
                                     image: project.maquette.resize.src}
          return (
            <Project key={project.nom} project={formattedProject}/>
          )
        })}

      </StyledProjectsGrid>
    </Page>
  )
}

export default Projects

export const pageQuery = graphql`
  query($id: String!) {
    allContentfulPageTech(filter: { id: { eq: $id } }) {
      edges {
        node {
          slug
          titre
          nomDansNavbar
          node_locale
          projets {
            descriptionCourte
            nom
            maquette {
              resize(width: 800, jpegProgressive: false, quality: 100) {
                src
              }
            }
            roles
            url
          }
          seoTitre
          seoDescription
        }
      }
    }
  }
`

