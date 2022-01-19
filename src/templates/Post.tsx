import * as React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/BlogLayout";
import Seo from "../components/seo";
import { Box, Divider, Flex, Heading, HStack } from "@chakra-ui/layout";
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
  Button,
} from "@chakra-ui/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { format } from "date-fns";
import { getTagUrl, mapEdgesToNodes } from "../lib/util";
import TableOfContents, { ContentItems } from "../components/TableOfContents";
import Series from "../components/Series";
import ScrollTopButton from "../components/ScrollTopButton";

type PostTemplateProps = {
  data: {
    post: {
      frontmatter: {
        title: string;
        description?: string;
        publishedAt: string;
        tag?: string[];
        series?: string;
      };
      body: string;
      excerpt: string;
      fields: {
        tags: {
          name: string;
          tagSlug: string;
        }[];
        series: {
          name: string;
          seriesSlug: string;
        };
      };
      tableOfContents: { items: ContentItems };
    };
    series: {
      edges: {
        node: {
          slug: string;
          frontmatter: {
            title: string;
            publishedAt: string;
          };
        };
      }[];
    };
  };
  location: Location;
};

const mdComponents = {
  h1: (props: any) => (
    <Heading
      {...props}
      as="h1"
      size="2xl"
      mt="24px"
      mb="16px"
      lineHeight="1.25"
      pb="0.3em"
    >
      {props.children}
    </Heading>
  ),
  h2: (props: any) => (
    <Heading
      {...props}
      as="h2"
      size="xl"
      mt="24px"
      mb="16px"
      lineHeight="1.25"
      pb="0.3em"
    >
      {props.children}
    </Heading>
  ),
  h3: (props: any) => (
    <Heading {...props} as="h3" size="lg" mt="24px" mb="16px" lineHeight="1.25">
      {props.children}
    </Heading>
  ),
  h4: (props: any) => (
    <Heading {...props} as="h4" size="md" mt="24px" mb="16px" lineHeight="1.25">
      {props.children}
    </Heading>
  ),
  h5: (props: any) => (
    <Heading {...props} as="h5" size="sm" mt="24px" mb="16px" lineHeight="1.25">
      {props.children}
    </Heading>
  ),
  h6: (props: any) => (
    <Heading {...props} as="h6" size="xs" mt="24px" mb="16px" lineHeight="1.25">
      {props.children}
    </Heading>
  ),
  p: (props: any) => {
    const { children } = props;
    return (
      <Text mt={0} mb={2}>
        {children}
      </Text>
    );
  },
  hr: (props: any) => {
    return <Divider />;
  },
  img: (props: any) => {
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
      <Code
        as="blockquote"
        mt="12px"
        mb="12px"
        borderLeft="4px solid #4abdb5"
        borderTopLeftRadius="4px"
        borderBottomRightRadius="4px"
        padding="1rem 1rem 1rem 2rem"
        fontFamily="Nanum Gothic"
        fontSize="md"
      >
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

const PostTemplate = ({ data, location }: PostTemplateProps) => {
  const post = data.post;
  const series = data.series;

  return (
    <Layout location={location}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Flex
        as="article"
        className="blog-post"
        flexDir="column"
        width="100%"
        maxWidth="720px"
      >
        <Flex as="header" flexDir="column" mb="24px">
          <Heading size="3xl">{post.frontmatter.title}</Heading>
          <Text mt="24px" pl="8px">
            {format(new Date(post.frontmatter.publishedAt), "yyyy. MM. dd.")}
          </Text>
          {post.frontmatter.series && (
            <Series
              currentTitle={post.frontmatter.title}
              seriesTitle={post.fields.series.name}
              seriesSlug={post.fields.series.seriesSlug}
              edges={series.edges}
            />
          )}
        </Flex>
        <Divider mb="24px" />

        <Box maxW="720px" mb="24px" position="relative">
          <TableOfContents items={post.tableOfContents.items} />
          <MDXProvider components={mdComponents}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </Box>
        <HStack spacing={2} mb="24px">
          {post.fields.tags.map((tag, index) => {
            return (
              <Button
                as={Link}
                to={getTagUrl(tag.tagSlug)}
                size="sm"
                background="#ebebeb"
                fontWeight="light"
                key={index}
              >
                #{tag.name}
              </Button>
            );
          })}
        </HStack>
        <Divider />
      </Flex>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostTemplateQuery($id: String!, $seriesSlug: String) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        publishedAt
        tags
        series
      }
      body
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
      tableOfContents(maxDepth: 3)
    }
    series: allMdx(
      filter: { fields: { series: { seriesSlug: { eq: $seriesSlug } } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            publishedAt
          }
          slug
        }
      }
    }
  }
`;
