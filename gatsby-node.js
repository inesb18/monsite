const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    // Filter out the footer, navbar, and meetups so we don't create pages for those
    const Pages = result.data.allMarkdownRemark.edges.filter(edge => {
      if (edge.node.fields.slug === "/navbar/" || edge.node.fields.slug === "/footer/") {
        return false;
      } else {
        return true;
      }
    });

    Pages.forEach(edge => {
      let component, pathName;
      if (edge.node.fields.slug.match(/^\/photography\/.*$/)) {
        pathName = edge.node.fields.slug;
        component = path.resolve(`src/templates/photography-cat.js`);
      } else {
        pathName = edge.node.fields.slug;
        component = path.resolve(`src/templates/${String(edge.node.fields.slug.slice(0,-1))}.js`);
      }
      const id = edge.node.id;
      createPage({
        path: pathName,
        component,
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    console.log(value);
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
