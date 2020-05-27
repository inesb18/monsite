/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, image, title }) {
  const { site, home } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              name
            }
          }
        }
        home: allContentfulPageAccueil {
          edges {
            node {
              node_locale
              seoDescription
              ogImage {
                file {
                  url
                }
              }
            }
          }
        }
      }
    `
  )

  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || home.edges.filter(({node}) => node.node_locale === lang )[0].node.seoDescription;
  const ogImage = 'https:' + home.edges.filter(({node}) => node.node_locale === lang )[0].node.ogImage.file.url;
  const language = lang  === 'fr' ? 'fr' : 'en';

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: site.siteMetadata.keywords,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `image`,
          content: image,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author.name,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link href="https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&family=Reem+Kufi&display=swap" rel="stylesheet"/>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `fr`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
