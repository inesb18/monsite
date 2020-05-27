require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Inès Belghiti`,
    siteUrl: `https://www.ines-belghiti.com`,
    author: {
      name: `Inès Belghiti`,
      link: `https://www.malt.fr/profile/inesbelghiti`
    },
    // image: "",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FB9F89`,
        theme_color: `#FB9F89`,
        display: `standalone`,
        icon: `static/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_KEY,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_PREVIEW_KEY,
        host: `preview.contentful.com`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
