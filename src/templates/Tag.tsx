import { Flex, Heading } from "@chakra-ui/react";
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

type TagTemplateProps = {
  data: {
    posts: PostEdges;
  };
  location: Location;
  pageContext: {
    name: string;
    tagSlug: string;
  };
};

const TagTemplate = ({
  data,
  location,
  pageContext: { name, tagSlug },
}: TagTemplateProps) => {
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterNoSlugs)
        .filter(filterPublishedInTheFuture)
    : [];
  return (
    <Layout location={location}>
      <Seo title={`Tag | ${name}`} />
      <Heading size="xl" mt="24px" mb="48px">
        Posts with #{name}
      </Heading>
      <PostList postNodes={postNodes} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagTemplateQuery($tagSlug: String!) {
    posts: allMdx(
      sort: { fields: frontmatter___publishedAt, order: DESC }
      filter: { fields: { tags: { elemMatch: { tagSlug: { eq: $tagSlug } } } } }
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
          }
        }
      }
    }
  }
`;

export default TagTemplate;
