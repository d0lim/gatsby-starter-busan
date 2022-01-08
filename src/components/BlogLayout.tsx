import * as React from "react";
import { Link } from "gatsby";
import { Flex, Heading } from "@chakra-ui/layout";
import { Link as Anchor, Text } from "@chakra-ui/react";

type LayoutProps = {
  location: Location;
  children: React.ReactNode;
};

const Layout = ({ location, children }: LayoutProps) => {
  return (
    <Flex flexDir="column" alignItems="center">
      <Flex
        as="header"
        width="100%"
        maxWidth="1080px"
        height="60px"
        justifyContent="space-between"
        mb="24px"
      >
        <Heading as="h1" size="xl" lineHeight="60px">
          <Link to="/">도림.로그</Link>
        </Heading>
        <Flex width="280px" justifyContent="space-between" alignItems="center">
          <Link to="/blog/tags">
            <Text fontWeight="medium">Tags</Text>
          </Link>
          <Link to="/blog/series">
            <Text fontWeight="medium">Series</Text>
          </Link>
          <Link to="/blog/archive">
            <Text fontWeight="medium">Archive</Text>
          </Link>
          <Link to="#">
            <Text fontWeight="medium">Search</Text>
          </Link>
        </Flex>
      </Flex>
      <Flex as="main" flexDir="column" width="100%" alignItems="center">
        {children}
      </Flex>
      <Flex as="footer" mt="48px">
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
