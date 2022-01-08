const path = require("path");
const { isFuture, format } = require("date-fns");
const slugify = require("slugify");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type == "Mdx") {
    const {
      frontmatter: { tags, series },
    } = node;

    createNodeField({
      node,
      name: "tags",
      value: tags.map(tag => {
        return {
          name: tag,
          tagSlug: slugify(tag, { remove: /[*+~.()'"!:@]/g, lower: true }),
        };
      }),
    });
    createNodeField({
      node,
      name: "series",
      value: {
        name: series,
        seriesSlug: slugify(series, { remove: /[*+~.()'"!:@]/g, lower: true }),
      },
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
  const seriesTemplate = path.resolve("./src/templates/Series.tsx");

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
              series {
                name
                seriesSlug
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
   * Process post edges to make post pages and organize tags
   */
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

  /**
   * Make set for organizing all tags
   * without duplicates
   */

  const tagSet = postEdges
    .filter(edge => !isFuture(new Date(edge.node.frontmatter.publishedAt)))
    .map(edge => edge.node.fields.tags)
    .reduce((prev, curr) => [...prev, ...curr])
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          e => e.name === value.name && e.tagSlug === value.tagSlug
        )
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

  /**
   * Process post edges to organize post series
   */

  const seriesSet = postEdges
    .filter(edge => !isFuture(new Date(edge.node.frontmatter.publishedAt)))
    .map(edge => edge.node.fields.series)
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          e => e.name === value.name && e.seriesSlug === value.seriesSlug
        )
    );

  seriesSet.forEach(series => {
    const path = `/blog/series/${series.seriesSlug}`;
    createPage({
      path,
      component: seriesTemplate,
      context: { name: series.name, seriesSlug: series.seriesSlug },
    });
  });
};
