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
  description: string;
  slug: { current: string };
  publishedAt: string;
  tags?: {
    title: string;
  }[];
  categories?: {
    title: string;
  }[];
  series?: {
    title: string;
  }[];
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
      {/* {postNodes.map((node: PostNode) => (
        <Link to={getPostUrl(node.publishedAt, node.slug)}>
          <div>{node.title}</div>
        </Link>
      ))} */}
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
          description
          slug {
            current
          }
          tags {
            title
          }
          series {
            title
          }
          categories {
            title
          }
        }
      }
    }
  }
`;
