import * as React from "react";
import { Flex, Heading, VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import Layout from "../../components/BlogLayout";
import Seo from "../../components/seo";
import { graphql, Link } from "gatsby";
import { isFuture } from "date-fns";
import Series from "../../components/Series";

type SeriesPageProps = {
  data: {
    allMdx: {
      group: {
        edges: {
          node: {
            frontmatter: {
              title: string;
              publishedAt: string;
            };
            slug: string;
            fields: {
              series: {
                name: string;
                seriesSlug: string;
              };
            };
          };
        }[];
      }[];
    };
  };
  location: Location;
};

const SeriesPage = ({ data, location }: SeriesPageProps) => {
  const seriesGroups = data.allMdx.group;

  return (
    <Layout location={location}>
      <Seo title="All Series" />
      <Heading size="xl" mt="24px" mb="48px">
        Series
      </Heading>
      <VStack spacing={4} width="100%" maxW="720px">
        {seriesGroups.map((group, index) => {
          return (
            <Series
              key={index}
              currentTitle=""
              seriesTitle={group.edges[0].node.fields.series.name}
              seriesSlug={group.edges[0].node.fields.series.seriesSlug}
              edges={group.edges}
            />
          );
        })}
      </VStack>
    </Layout>
  );
};

export const pageQuery = graphql`
  query SeriesPageQuery {
    allMdx(
      filter: { slug: { ne: null }, frontmatter: { publishedAt: { ne: null } } }
      sort: { fields: frontmatter___publishedAt, order: DESC }
    ) {
      group(field: frontmatter___series) {
        edges {
          node {
            frontmatter {
              title
              series
              publishedAt
            }
            slug
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
  }
`;

export default SeriesPage;
