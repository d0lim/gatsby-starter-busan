import * as React from "react";
import { Flex, Heading, HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import Layout from "../../components/BlogLayout";
import { graphql, Link } from "gatsby";
import { isFuture } from "date-fns";
import Seo from "../../components/seo";

type TagsPageProps = {
  data: {
    allMdx: {
      edges: {
        node: {
          frontmatter: {
            publishedAt: string;
          };
          fields: {
            tags: {
              name: string;
              tagSlug: string;
            }[];
          };
        };
      }[];
    };
  };
  location: Location;
};

const TagsPage = ({ data, location }: TagsPageProps) => {
  const postEdges = data.allMdx.edges;
  const tags = postEdges
    .filter(edge => !isFuture(new Date(edge.node.frontmatter.publishedAt)))
    .map(edge => edge.node.fields.tags)
    .reduce((prev, curr) => [...prev, ...curr])
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          e => e.name === value.name && e.tagSlug === value.tagSlug
        )
    )
    .sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });

  return (
    <Layout location={location}>
      <Seo title="Tags" />
      <Heading size="xl" mt="24px" mb="48px">
        Tags Page
      </Heading>
      <HStack spacing={4}>
        {tags.map(tag => (
          <Link to={tag.tagSlug}>
            <Text>#{tag.name}</Text>
          </Link>
        ))}
      </HStack>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsPageQuery {
    allMdx(
      filter: { slug: { ne: null }, frontmatter: { publishedAt: { ne: null } } }
      sort: { fields: frontmatter___publishedAt, order: DESC }
    ) {
      edges {
        node {
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
`;
