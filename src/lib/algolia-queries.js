const { format } = require("date-fns");
const pagePath = `content`;
const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;

const pageQuery = `
  {
    pages: allMdx(
      filter: { slug: { ne: null }, frontmatter: { publishedAt: { ne: null } } }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            description
            publishedAt
          }
          fields {
            tags {
              name
            }
          }
          excerpt(pruneLength: 5000)
        }
      }
    }
  }
`;

function pageToAlgoliaRecord({
  node: {
    id,
    frontmatter: { title, description, publishedAt },
    fields: { tags },
    slug,
    excerpt,
  },
}) {
  return {
    objectID: id,
    title,
    description,
    tags: tags.map(tag => `#${tag.name}`),
    slug: `/blog/${format(new Date(publishedAt), "yyyy/MM")}/${slug}`,
    excerpt,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;
