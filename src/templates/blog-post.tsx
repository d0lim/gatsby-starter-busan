import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { Box, Divider, Flex, Heading } from "@chakra-ui/layout";
import {
  Text,
  Image,
  OrderedList,
  UnorderedList,
  Code,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

type PostTemplateProps = {
  data: {
    post: {
      frontmatter: {
        title: string;
        description?: string;
        publishedAt: string;
        tag?: string[];
        category?: string[];
        series?: string;
      };
      body: string;
      excerpt: string;
    };
  };
  location: Location;
};

const mdComponents = {
  h1: (props: any) => (
    <Heading {...props} as="h1" size="2xl">
      {props.children}
    </Heading>
  ),
  h2: (props: any) => (
    <Heading {...props} as="h2" size="xl">
      {props.children}
    </Heading>
  ),
  h3: (props: any) => (
    <Heading {...props} as="h3" size="lg">
      {props.children}
    </Heading>
  ),
  h4: (props: any) => (
    <Heading {...props} as="h4" size="md">
      {props.children}
    </Heading>
  ),
  h5: (props: any) => (
    <Heading {...props} as="h5" size="sm">
      {props.children}
    </Heading>
  ),
  h6: (props: any) => (
    <Heading {...props} as="h6" size="xs">
      {props.children}
    </Heading>
  ),
  p: (props: any) => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
  hr: (props: any) => {
    return <Divider />;
  },
  img: (props: any) => {
    console.log("Image props:", props);
    return <Image {...props}>{props.children}</Image>;
  },
  ul: (props: any) => {
    const { ordered, children, depth } = props;
    let Element = UnorderedList;
    return (
      <Element spacing={2} as={"ul"} pl={4} {...props}>
        {children}
      </Element>
    );
  },
  ol: (props: any) => {
    const { children, depth } = props;
    let Element = OrderedList;
    return (
      <Element spacing={2} as={"ol"} pl={4} {...props}>
        {children}
      </Element>
    );
  },
  blockquote: (props: any) => {
    const { children } = props;
    return (
      <Code as="blockquote" p={2}>
        {children}
      </Code>
    );
  },
  table: (props: any) => <Table colorScheme="facebook">{props.children}</Table>,
  thead: Thead,
  tbody: Tbody,
  tr: (props: any) => <Tr>{props.children}</Tr>,
  td: (props: any) => <Td>{props.children}</Td>,
  th: (props: any) => <Th>{props.children}</Th>,
  a: (props: any) => (
    <ChakraLink as="a" {...props} color="teal.500">
      {props.children}
    </ChakraLink>
  ),
};

const BlogPostTemplate = ({ data, location }: PostTemplateProps) => {
  const post = data.post;

  return (
    <Layout location={location}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Flex as="header" flexDir="column" mb="48px">
          <Heading size="3xl">{post.frontmatter.title}</Heading>
          <Text>{post.frontmatter.publishedAt}</Text>
        </Flex>
        <Box maxW="720px" width="100%">
          <MDXProvider components={mdComponents}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </Box>

        <hr />
        <footer></footer>
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        publishedAt
        tag
        category
        series
      }
      body
    }
  }
`;
