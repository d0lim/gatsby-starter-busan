const path = require("path");
const { isFuture, format } = require("date-fns");
var slugify = require("slugify");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type == "Mdx") {
    const {
      frontmatter: { tags },
    } = node;

    createNodeField({
      node,
      name: "tags",
      value: tags.map(tag => {
        return {
          name: tag,
          tagSlug: slugify(tag, { remove: /[*+~.()'"!:@]/g }),
        };
      }),
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MdxFrontmatter {
      title: String!
      description: String
      tags: [String]
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

  // Define template paths
  const blogPost = path.resolve(`./src/templates/Post.tsx`);
  const tagTemplate = path.resolve("./src/templates/Tag.tsx");

  // Get all markdown blog posts sorted by date
  const allPostResult = await graphql(`
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
            fields {
              tags {
                name
                tagSlug
              }
            }
          }
        }
      }
    }
  `);

  if (allPostResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      allPostResult.errors
    );
    return;
  }

  const postEdges = (allPostResult.data.allMdx || {}).edges || [];

  /**
   * Make set for organizing all tags
   */
  let tagArray = [];

  /**
   * Process post edges to make post pages and organize tags
   */
  postEdges
    .filter(edge => !isFuture(new Date(edge.node.frontmatter.publishedAt)))
    .forEach(edge => {
      const {
        id,
        slug = "",
        frontmatter: { publishedAt },
        fields: { tags },
      } = edge.node;
      const dateSegment = format(new Date(publishedAt), "yyyy/MM");
      const path = `/blog/${dateSegment}/${slug}`;

      createPage({
        path,
        component: blogPost,
        context: { id },
      });

      /**
       * tags will be array
       * and we need to make our own 'Set-like' array
       */
      tagArray = [...tagArray, ...tags];
    });

  /**
   * Remove duplicates in tagArray with using tagSlug as key
   */
  const tagSet = tagArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex(e => e.name === value.name && e.tagSlug === value.tagSlug)
  );

  /**
   * Create tag pages
   */
  tagSet.forEach(tag => {
    const path = `/blog/tags/${tag.tagSlug}`;
    createPage({
      path,
      component: tagTemplate,
      context: { tagSlug: tag.tagSlug, name: tag.name },
    });
  });
};
