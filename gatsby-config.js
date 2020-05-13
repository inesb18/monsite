module.exports = {
  siteMetadata: {
    title: `Inès Belghiti`,
    siteUrl: `https://www.ines-belghiti.com`,
    description: `Passionnée de Développement Web, Product Management & Photographie`,
    author: {
      name: `Inès Belghiti`,
      link: `https://www.malt.fr/profile/inesbelghiti`
    },
    // image: "",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    "gatsby-remark-source-name",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
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
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `static/favicon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
