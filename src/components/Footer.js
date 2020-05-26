import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components';

import CustomLink from './CustomLink';

const StyledFooter = styled.footer `
  padding: ${props => props.theme.outPadding};
  background: ${props => props.theme.lightPeach};
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  .footer_left {
    p {
      margin: 0;
    }
    .languages {
      a.active {
        font-weight: bold;
      }
    }
  }
  .footer_right {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: right;
  }
  @media (max-width: 768px) {
    padding: ${props => props.theme.outPaddingSmall};
    font-size: 1.2rem;
  }
`;


const Footer  = ({ lang, slug }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulFooter {
        edges {
          node {
            email
          }
        }
      }
    }
  `)
  const footer = data.allContentfulFooter.edges[0].node;
  return (
    <StyledFooter>
      <div className="footer_left">
        <p>© 2020 - {lang === "en-US" ? "All Rights Reserved." : "Tous droits réservés."}</p>
        {
          slug &&
          <div className="languages">
            <CustomLink
              lang={lang}
              className={lang === "fr" ? "active" : ""}
              linkType={"internal"}
              linkURL={"/"+slug}
            >
              FR
            </CustomLink>
            {`-`}
            <CustomLink
              lang={lang}
              className={lang === "en-US" ? "active" : ""}
              linkType={"internal"}
              linkURL={`/en-US/${slug}`}
            >
              EN
            </CustomLink>
          </div>

        }
      </div>
      <ul className="footer_right">
        <li>
          <CustomLink
            linkType={"internal"}
            linkURL="#"
          >
            {lang === "en-US" ? "Legal notice" : "Mentions légales"}
          </CustomLink>
        </li>
        <li>
          <CustomLink
            linkType={"external"}
            linkURL={footer.email}
          >
            Contact
          </CustomLink>
        </li>
      </ul>

    </StyledFooter>
  )
}

export default Footer
