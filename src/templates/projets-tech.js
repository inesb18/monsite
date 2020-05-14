import React from "react";
import { graphql } from "gatsby"
import styled from 'styled-components';

import Page from "../components/Page";
import PageTitle from "../components/PageTitle";

const StyledProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 6rem;
  grid-auto-rows: 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

const StyledProject = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .infos {
    opacity: 0;
    transition: all 0.1s;
    padding: 2rem 1rem;
    display: grid;
    align-items: center;
    grid-template-rows: auto 1fr 1fr 1fr;
    grid-gap: 1rem;
    justify-content: center;
    text-align: center;
    h2 {
      font-family: "Philosopher";
      font-size: 3.2rem;
      margin: 0;
      font-weight: bold;
    }
    p {
      margin: 0;
    }
    a {
      font-weight: bold;
      margin: 0 auto;
      width: fit-content;
      padding: 1rem;
      color: ${props => props.theme.peach};
      border-top: 4px solid ${props => props.theme.peach};
      border-bottom: 4px solid ${props => props.theme.peach};
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
  &:hover {
    background: white;
    background: linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${props => props.image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;  background-size: cover;
    .infos {
      transition: all 0.8s;
      opacity: 1;
    }
  }
  @media (max-width: 768px) {
    .infos {
      font-size: 1.4rem;
      padding: 1rem;
      grid-gap: 0.6rem;
    }
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
            <StyledProject key={project.name} image={project.image}>
              <div className="infos">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <a href={project.URL} target="_blank" rel="noopener noreferrer">SITE WEB</a>
                <ul>
                  {project.roles.map((role)=> {
                    return(<li key={role}>{role}</li>);
                  })}
                </ul>
              </div>
            </StyledProject>
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

