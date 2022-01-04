import * as React from "react";
import { Link } from "gatsby";
import { Flex, Heading } from "@chakra-ui/layout";
import { Link as Anchor, Text } from "@chakra-ui/react";

type LayoutProps = {
  location: Location;
  title: string;
  children: React.ReactNode;
};

const Layout = ({ location, title, children }: LayoutProps) => {
  return (
    <Flex flexDir="column" alignItems="center">
      <Flex
        as="header"
        width="100%"
        maxWidth="1080px"
        height="60px"
        justifyContent="space-between"
      >
        <Heading as="h1" size="xl" lineHeight="60px">
          <Link to="/">{title}</Link>
        </Heading>
        <Flex width="350px" justifyContent="space-between" alignItems="center">
          <Text fontWeight="medium">Categories</Text>
          <Text fontWeight="medium">Tags</Text>
          <Text fontWeight="medium">Series</Text>
          <Text fontWeight="medium">Archive</Text>
          <Text fontWeight="medium">Search</Text>
        </Flex>
      </Flex>
      <Flex as="main" flexDir="column" width="100%" maxWidth="720px">
        {children}
      </Flex>
      <Flex as="footer">
        © {new Date().getFullYear()}, Built with
        {` `}
        <Anchor ml="1" href="https://www.gatsbyjs.com">
          Gatsby
        </Anchor>
      </Flex>
    </Flex>
  );
};

export default Layout;
