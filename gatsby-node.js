const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const createHomePage = new Promise((resolve, reject) => {
    const query = graphql(`
      {
        allContentfulPageAccueil {
          edges {
            node {
              id
              node_locale
            }
          }
        }
      }
    `)
    query.then(result => {
      result.data.allContentfulPageAccueil.edges.forEach(({ node }) => {
        const pathForTemplate = `./src/templates/home.js`;
        const locale = node.node_locale === 'fr' ? '' : 'en';
        createPage({
          path: `/${locale}`,
          component: path.resolve(pathForTemplate),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })

  const createAboutPage = new Promise((resolve, reject) => {
    const query = graphql(`
      {
        allContentfulPageAPropos {
          edges {
            node {
              id
              node_locale
              slug
            }
          }
        }
      }
    `)
    query.then(result => {
      result.data.allContentfulPageAPropos.edges.forEach(({ node }) => {
        const pathForTemplate = `./src/templates/about.js`;
        const locale = node.node_locale === 'fr' ? '' : `en/`;
        createPage({
          path: `/${locale}${node.slug}`,
          component: path.resolve(pathForTemplate),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })

  const createTechPage = new Promise((resolve, reject) => {
    const query = graphql(`
      {
        allContentfulPageTech {
          edges {
            node {
              id
              node_locale
              slug
            }
          }
        }
      }
    `)
    query.then(result => {
      result.data.allContentfulPageTech.edges.forEach(({ node }) => {
        const pathForTemplate = `./src/templates/tech-projects.js`;
        const locale = node.node_locale === 'fr' ? '' : `en/`;
        createPage({
          path: `/${locale}${node.slug}`,
          component: path.resolve(pathForTemplate),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })

  const createPhotoPage = new Promise((resolve, reject) => {
    const query = graphql(`
      {
        allContentfulPagePhoto {
          edges {
            node {
              id
              node_locale
              slug
            }
          }
        }
      }
    `)
    query.then(result => {
      result.data.allContentfulPagePhoto.edges.forEach(({ node }) => {
        const pathForTemplate = `./src/templates/photography.js`;
        const locale = node.node_locale === 'fr' ? '' : `en/`;
        createPage({
          path: `/${locale}${node.slug}`,
          component: path.resolve(pathForTemplate),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })

  const createPhotoCatPage = new Promise((resolve, reject) => {
    const query = graphql(`
      {
        allContentfulPagePhotoCategorie {
          edges {
            node {
              id
              node_locale
              slug
            }
          }
        }
      }
    `)
    query.then(result => {
      result.data.allContentfulPagePhotoCategorie.edges.forEach(({ node }) => {
        const pathForTemplate = `./src/templates/photography-cat.js`;
        const locale = node.node_locale === 'fr' ? '' : `en/`;
        createPage({
          path: `/${locale}${node.slug}`,
          component: path.resolve(pathForTemplate),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })

  const createMentionsLegales = new Promise((resolve, reject) => {
    const query = graphql(`
      {
        allContentfulPageMentionsLegales {
          edges {
            node {
              id
              node_locale
            }
          }
        }
      }
    `)
    query.then(result => {
      result.data.allContentfulPageMentionsLegales.edges.forEach(({ node }) => {
        const pathForTemplate = `./src/templates/mentions-legales.js`;
        if (node.node_locale === "fr") {
          createPage({
            path: `/mentions-legales`,
            component: path.resolve(pathForTemplate),
            context: {
              id: node.id,
            },
          })
        }
      })
      resolve()
    })
  })

  return Promise.all([createHomePage, createAboutPage, createTechPage, createPhotoPage, createPhotoCatPage, createMentionsLegales])
}
