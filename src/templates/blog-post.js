import * as React from "react";
import { Link, graphql } from "gatsby";
import BasePortableBlock from "@sanity/block-content-to-react";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPostTemplate = ({ data, location }) => {
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
        {post._rawBody && <BasePortableBlock blocks={post._rawBody} />}
        <hr />
        <footer>
          <Bio />
        </footer>
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
      _rawBody(resolveReferences: { maxDepth: 5 })
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
