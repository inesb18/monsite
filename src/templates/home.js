import React from "react";
import styled from 'styled-components';

import Page from "../components/Page";
import CustomLink from '../components/CustomLink';


const StyledBlock = styled.div `
  background: ${props => props.theme.peach};
  padding: 2.8rem;
  color: white;
  min-width: fit-content;
  width: 45rem;
  max-width: 100%;
  h1 {
    margin: 0 0 10rem 0;
    font-weight: bold;
    font-size: 4rem;
  }
  .block_infos {
    display: flex;
    p {
      margin-right: 1rem;
    }
    p, h2 {
      font-size: 2rem;
      margin-top: 0;
      margin-bottom: 0;
      font-weight: normal;
    }
    h2:last-child:before {
      content:"& ";
    }
  }
  position: relative;
  &:after {
    content: "";
    background: ${props => props.theme.veryLightPeach};
    position: absolute;
    top: 20%;
    left: 20%;
    width: 200vw;
    height: 200vh;
    z-index: -1;
  }
  @media (max-width: 768px) {
    padding: 1.6rem;
    h1 {
      font-size: 3.2rem;
      margin-bottom: 5rem;
    }
    .block_infos {
      p, h2 {
        font-size: 1.6rem;
      }
    }
  }
`;

const StyledLinks = styled.div `
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 3rem;
  .home_linkPortfolio, .home_LinkAbout {
    display: block;
  }
  .home_linkPortfolio {
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    &:after {
      position: absolute;
      right: 0;
      bottom: 0;
      content: "";
      background: ${props => props.theme.peach};
      width: 40%;
      height: 6px;
    }
  }
  .home_linkAbout {
    color: ${props => props.theme.darkPeach};
    margin-top: 2rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const IndexPage = ({ data }) => {
  const home = data.allContentfulPageAccueil.edges[0].node;
  const locale = home.node_locale === 'fr' ? '' : `en/`;
  const completeSlugTech = `/${locale}${data.allContentfulPageTech.edges[0].node.slug}`;
  const completeSlugPhoto = `/${locale}${data.allContentfulPagePhoto.edges[0].node.slug}`;
  const completeSlugAbout = `/${locale}${data.allContentfulPageAPropos.edges[0].node.slug}`;
  return (
    <Page section={home.nomDansNavbar} lang={home.node_locale} slug=" " title={home.seoTitre} description={home.seoDescription}>
      <StyledBlock>
        <h1>{home.nom}</h1>
        <div className="block_infos">
          <p>{home.passionneDe}{` `}</p>
          <div>
            {home.domaines.map((field) => {
              return(
                <h2 key={field}>{field}</h2>
              )
            })}
          </div>
        </div>
      </StyledBlock>
      <StyledLinks>
        <CustomLink className="home_linkPortfolio" linkURL={completeSlugTech} linkType="internal" >
          {home.texteLienPageTech}
        </CustomLink>
        <CustomLink className="home_linkPortfolio" linkURL={completeSlugPhoto} linkType="internal" >
          {home.texteLienPagePhoto}
        </CustomLink>
        <CustomLink className="home_linkAbout" linkURL={completeSlugAbout} linkType="internal" >
          {home.texteLienPropos}
        </CustomLink>
      </StyledLinks>
    </Page>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query($id: String!) {
    allContentfulPageAccueil(filter: { id: { eq: $id } }) {
      edges {
        node {
          node_locale
          nom
          passionneDe
          texteLienPagePhoto
          texteLienPageTech
          texteLienPropos
          domaines
          nomDansNavbar
          seoTitre
          seoDescription
          ogImage {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulPageTech(limit: 1) {
      edges {
        node {
          slug
        }
      }
    }
    allContentfulPagePhoto(limit: 1) {
      edges {
        node {
          slug
        }
      }
    }
    allContentfulPageAPropos(limit: 1) {
      edges {
        node {
          slug
        }
      }
    }
  }
`
