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
  const projects = data.projects.edges[0].node.frontmatter.projects;
  return (
    <Page section="Tech">
      <PageTitle title="Projets Tech"/>
      <StyledProjectsGrid>
        {projects.map((project)=> {
          return (
            <Project key={project.name} project={project}/>
          )
        })}

      </StyledProjectsGrid>
    </Page>
  )
}

export default Projects

export const pageQuery = graphql`
  query {
    projects: allMarkdownRemark(filter: {fields: {slug: {eq: "/projets-tech/"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            projects {
              URL
              description
              image
              name
              roles
            }
          }
        }
      }
    }
  }
`

