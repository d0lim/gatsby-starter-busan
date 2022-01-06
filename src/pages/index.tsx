import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import {
  mapEdgesToNodes,
  filterNoSlugs,
  filterPublishedInTheFuture,
  getPostUrl,
} from "../lib/util";
import PostList from "../components/PostList";
import Bio from "../components/Bio";

export type PostEdges = {
  edges: PostEdge[];
};

export type PostEdge = {
  node: PostNode;
};

export type PostNode = {
  id: string;
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    publishedAt: string;
    tag: string[];
    category: string[];
    series?: string;
  };
};

type DataProps = {
  posts: PostEdges;
};

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterNoSlugs)
        .filter(filterPublishedInTheFuture)
    : [];

  if (!postNodes)
    return (
      <Layout location={location}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );

  return (
    <Layout location={location}>
      <Seo title="All posts" />
      <Bio />
      <PostList postNodes={postNodes} />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query IndexPageQuery {
    posts: allMdx(
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
            tag
            category
            series
          }
        }
      }
    }
  }
`;
