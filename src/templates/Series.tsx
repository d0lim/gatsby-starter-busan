import { Heading } from "@chakra-ui/react";
import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/BlogLayout";
import PostList from "../components/PostList";
import Seo from "../components/seo";
import {
  mapEdgesToNodes,
  filterNoSlugs,
  filterPublishedInTheFuture,
} from "../lib/util";
import { PostEdges } from "../pages";

type SeriesTemplateProps = {
  data: {
    posts: PostEdges;
  };
  location: Location;
  pageContext: {
    name: string;
    seriesSlug: string;
  };
};

const SeriesTemplate = ({
  data,
  location,
  pageContext: { name, seriesSlug },
}: SeriesTemplateProps) => {
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterNoSlugs)
        .filter(filterPublishedInTheFuture)
    : [];
  return (
    <Layout location={location}>
      <Seo title={`Series - ${name}`} />
      <Heading size="xl" mt="24px" mb="48px">
        Series - {name}
      </Heading>
      <PostList postNodes={postNodes} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query SeriesTemplateQuery($seriesSlug: String!) {
    posts: allMdx(
      sort: { fields: frontmatter___publishedAt, order: DESC }
      filter: { fields: { series: { seriesSlug: { eq: $seriesSlug } } } }
    ) {
      edges {
        node {
          id
          slug
          frontmatter {
            title
            description
            publishedAt
            tags
            series
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
`;

export default SeriesTemplate;
