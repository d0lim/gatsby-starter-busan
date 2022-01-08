import * as React from "react";
import { Flex, Heading, HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import Layout from "../../components/BlogLayout";
import Seo from "../../components/seo";
import { graphql, Link } from "gatsby";
import { isFuture } from "date-fns";

type SeriesPageProps = {
  data: {
    allMdx: {
      edges: {
        node: {
          frontmatter: {
            publishedAt: string;
          };
          fields: {
            series: {
              name: string;
              seriesSlug: string;
            };
          };
        };
      }[];
    };
  };
  location: Location;
};

const SeriesPage = ({ data, location }: SeriesPageProps) => {
  const postEdges = data.allMdx.edges;
  const series = postEdges
    .filter(edge => !isFuture(new Date(edge.node.frontmatter.publishedAt)))
    .map(edge => edge.node.fields.series)
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          e => e.name === value.name && e.seriesSlug === value.seriesSlug
        )
    )
    .sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  return (
    <Layout location={location}>
      <Seo title="All Series" />
      <Heading size="xl" mt="24px" mb="48px">
        Series
      </Heading>
      <HStack spacing={4}>
        {series.map(s => (
          <Link to={s.seriesSlug}>
            <Text>#{s.name}</Text>
          </Link>
        ))}
      </HStack>
    </Layout>
  );
};

export const pageQuery = graphql`
  query SeriesPageQuery {
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
            series {
              name
              seriesSlug
            }
          }
        }
      }
    }
  }
`;

export default SeriesPage;
