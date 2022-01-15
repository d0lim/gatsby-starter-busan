import * as React from "react";
import { Flex, Heading, HStack } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";
import Layout from "../../components/BlogLayout";
import { graphql, Link } from "gatsby";
import { isFuture } from "date-fns";
import Seo from "../../components/seo";

type TagsPageProps = {
  data: {
    tagData: {
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
    groupData: {
      group: {
        totalCount: number;
        fieldValue: string;
      }[];
    };
  };
  location: Location;
};

const TagsPage = ({ data, location }: TagsPageProps) => {
  const postEdges = data.tagData.edges;
  const group = data.groupData.group;
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
      <Seo title="All Tags" />
      <Heading size="xl" mt="24px" mb="48px">
        Tags Page
      </Heading>
      <HStack spacing={4}>
        {tags.map(tag => (
          <Button
            as={Link}
            to={tag.tagSlug}
            background="#ebebeb"
            fontWeight="light"
          >
            <Flex alignItems="flex-end">
              <Text>#{tag.name}</Text>
              <Text fontWeight="bold" ml={1} fontSize="xs">
                ({group.find(e => e.fieldValue === tag.name)?.totalCount})
              </Text>
            </Flex>
          </Button>
        ))}
      </HStack>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagsPageQuery {
    tagData: allMdx(
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
    groupData: allMdx {
      group(field: frontmatter___tags) {
        totalCount
        fieldValue
      }
    }
  }
`;

export default TagsPage;
