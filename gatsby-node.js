const path = require("path");
const { isFuture, format } = require("date-fns");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MdxFrontmatter {
      title: String!
      description: String
      tag: [String]
      category: [String]
      series: String
      publishedAt: Date! @dateformat
      mainImage: File @fileByRelativePath
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMdx(
        filter: {
          slug: { ne: null }
          frontmatter: { publishedAt: { ne: null } }
        }
        sort: { fields: frontmatter___publishedAt, order: DESC }
      ) {
        edges {
          node {
            id
            slug
            frontmatter {
              publishedAt
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const postEdges = (result.data.allMdx || {}).edges || [];
  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  postEdges
    .filter(edge => !isFuture(new Date(edge.node.frontmatter.publishedAt)))
    .forEach(edge => {
      const {
        id,
        slug = "",
        frontmatter: { publishedAt },
      } = edge.node;
      const dateSegment = format(new Date(publishedAt), "yyyy/MM");
      const path = `/blog/${dateSegment}/${slug}`;

      createPage({
        path,
        component: blogPost,
        context: { id },
      });
    });
};
