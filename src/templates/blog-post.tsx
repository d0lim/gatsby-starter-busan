import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

type PostTemplateProps = {
  data: {
    post: {
      id: string;
      publishedAt: string;
      categories?: {
        _id: string;
        title: string;
      };
      title: string;
      description: string;
      slug: {
        current: string;
      };
      // TODO: define markdown type
      content: {
        markdown: any;
      };
      author: {
        image?: {
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
        name: string;
      };
      mainImage?: {
        asset: {
          _id: string;
          url: string;
        };
      };
    };
  };
  location: Location;
};

const BlogPostTemplate = ({ data, location }: PostTemplateProps) => {
  const post = data.post;
  const siteTitle = data.post?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.title} description={post.description || ""} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.publishedAt}</p>
        </header>
        {/* <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        /> */}
        {post.content.markdown}
        <hr />
        <footer></footer>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      title
      description
      slug {
        current
      }
      content {
        markdown
      }
      author {
        image {
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
        name
      }
      mainImage {
        asset {
          _id
          url
        }
      }
    }
  }
`;
