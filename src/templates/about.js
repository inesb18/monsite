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

const StyledLinks = styled.div`
  margin-top: ${props => props.theme.innerVerticalPadding};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    -webkit-filter: drop-shadow(8px 8px 0 ${props => props.theme.veryLightPeach});
    filter: drop-shadow(8px 8px 0 ${props => props.theme.veryLightPeach});
    path {
      fill: ${props => props.theme.peach};
    }
    &:hover {
      path {
        fill: ${props => props.theme.darkPeach};
      }
    }
  }
  a {
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;



const About = ({ data }) => {
  const about = data.allContentfulPageAPropos.edges[0].node;
  return (
    <Page section={about.nomDansNavbar} lang={about.node_locale} slug={about.slug} title={about.seoTitre} description={about.seoDescription}>
      <StyledHeaderAbout>
        <PageTitle title={about.titre}/>
        <div className="photo">
          <img src={about.photo.resize.src} alt="Inès Belghiti"/>
        </div>
      </StyledHeaderAbout>
      <StyledText dangerouslySetInnerHTML={{ __html: about.texte.childMarkdownRemark.html }} />
      <StyledLinks>
        {
          about.lienLinkedIn &&
          <a href={about.lienLinkedIn} target="_blank" rel="noopener noreferrer">
            <svg height="70" viewBox="0 0 512 512" width="70" xmlns="http://www.w3.org/2000/svg">
              <title>{about.node_locale === "fr" ? "Mon LinkedIn" : "My LinkedIn account"}</title>
              <path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm-74.390625 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0"/>
            </svg>
          </a>
        }
        { 
          about.lienMalt &&
          <a href={about.lienMalt} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 93 92">
                <title>{about.node_locale === "fr" ? "Mon profil Freelance sur Malt" : "My Freelance profile on Malt"}</title>
                <g>
                    <path d="M34.561 78.975c0 7.844 5.104 12.282 11.45 12.306.016 0-.016 0 0 0 6.324.002 11.54-5.976 11.566-12.306L46.003 67.257 34.561 78.975z"/>
                    <path d="M30.494 12.753a11.432 11.432 0 0 0-8.062-3.546c-3.094-.058-5.99 1.068-8.21 3.192-4.584 4.39-4.742 11.688-.354 16.272l1.718 1.794 24.332.104 3.916-3.882-13.34-13.934zM78.353 62.739l-1.718-1.794-24.332-.104-3.916 3.882 13.34 13.934c4.388 4.58 11.69 4.74 16.272.354 4.582-4.39 4.742-11.688.354-16.272"/>
                    <path d="M79.246 34.335L55.92 57.255l24.742.106h.05c3.056 0 5.932-1.182 8.104-3.334A11.448 11.448 0 0 0 92.22 45.9c.026-6.344-4.974-11.728-12.974-11.566M11.558 34.05h-.054a11.425 11.425 0 0 0-8.098 3.334A11.439 11.439 0 0 0 0 45.508c-.014 3.074.578 11.556 13.16 11.556L36.3 34.156l-24.742-.106z"/>
                    <path d="M78.854 13.239c-4.468-4.506-11.768-4.54-16.274-.068L13.436 61.893c-4.506 4.47-4.538 11.77-.07 16.276 4.468 4.508 11.77 4.542 16.276.07l49.142-48.722c4.508-4.47 4.538-11.772.07-16.278"/>
                    <path d="M58.578 12.305c0-7.844-5.104-12.28-11.45-12.304-.016 0 .016 0 0 0C40.804 0 35.588 5.975 35.562 12.305l11.574 11.718 11.442-11.718z"/>
                </g>
            </svg>
          </a>
        }
        {
          about.lienGitHub &&
          <a href={about.lienGitHub} target="_blank" rel="noopener noreferrer">
            <svg enable-background="new 0 0 24 24" height="70" viewBox="0 0 24 24" width="70" xmlns="http://www.w3.org/2000/svg">
              <title>{about.node_locale === "fr" ? "Mon GitHub" : "My GitHub account"}</title>
              <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z" />
            </svg>
          </a>
        }
        { about.mail &&
          <a href={`mailto:${about.mail}`} target="_blank" rel="noopener noreferrer">
            <svg height="70" viewBox="0 0 448 448" width="70" xmlns="http://www.w3.org/2000/svg">
              <title>{about.node_locale === "fr" ? "Mon adresse mail" : "My email address"}</title>
              <path d="m314.375 144h-180.75l90.375 77.464844zm0 0"/>
              <path d="m224 240c-1.910156 0-3.757812-.683594-5.207031-1.929688l-98.792969-84.679687v150.609375h208v-150.609375l-98.792969 84.679687c-1.449219 1.246094-3.296875 1.929688-5.207031 1.929688zm0 0"/>
              <path d="m224 0c-123.710938 0-224 100.289062-224 224s100.289062 224 224 224 224-100.289062 224-224c-.140625-123.652344-100.347656-223.859375-224-224zm120 312c0 4.417969-3.582031 8-8 8h-224c-4.417969 0-8-3.582031-8-8v-176c0-4.417969 3.582031-8 8-8h224c4.417969 0 8 3.582031 8 8zm0 0"/>
            </svg>
          </a>
        }
      </StyledLinks>
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
          mail
          lienGitHub
          lienLinkedIn
          texte {
            childMarkdownRemark {
              html
            }
          }
          photo {
            resize(jpegProgressive: false, width: 600, quality: 100) {
              src
            }
          }
          nomDansNavbar
          seoTitre
          seoDescription
        }
      }
    }
  }
`

