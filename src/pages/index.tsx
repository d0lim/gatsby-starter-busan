import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import {
  mapEdgesToNodes,
  filterNoSlugs,
  filterPublishedInTheFuture,
} from "../lib/util";

export type PostEdges = {
  edges: PostEdge[];
};

export type PostEdge = {
  node: PostNode;
};

export type PostNode = {
  id: string;
  mainImage?: {
    crop?: {
      _key: string;
      _type: string;
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    hotspot?: {
      _key: string;
      _type: string;
      x: number;
      y: number;
      height: number;
      width: number;
    };
    asset: {
      _id: string;
    };
  };
  title: string;
  slug: { current: string };
  publishedAt: string;
};

type DataProps = {
  posts: PostEdges;
};

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = `Title`;
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterNoSlugs)
        .filter(filterPublishedInTheFuture)
    : [];

  if (!postNodes)
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      {postNodes.map((node: PostNode) => (
        <div>{node.title}</div>
      ))}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  fragment SanityMainImage on SanityImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityMainImage
          }
          title
          slug {
            current
          }
        }
      }
    }
  }
`;
