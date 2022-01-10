import * as React from "react";
import { Link } from "gatsby";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button, Link as Anchor, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchButton from "./SearchButton";
import HamburgerMenuButton from "./MenuButton";

type LayoutProps = {
  location: Location;
  children: React.ReactNode;
};

const Layout = ({ location, children }: LayoutProps) => {
  return (
    <Flex flexDir="column" alignItems="center" pl="12px" pr="12px">
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
        <Flex
          width={{ base: "100px", md: "280px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            as={Link}
            to="/blog/tags"
            background="#f5f5f5"
            display={{ base: "none", sm: "none", md: "inline-flex" }}
          >
            <Text fontWeight="medium">Tags</Text>
          </Button>
          <Button
            as={Link}
            to="/blog/series"
            background="#f5f5f5"
            display={{ base: "none", sm: "none", md: "inline-flex" }}
          >
            <Text fontWeight="medium">Series</Text>
          </Button>
          <Button
            as={Link}
            to="/blog/archive"
            background="#f5f5f5"
            display={{ base: "none", sm: "none", md: "inline-flex" }}
          >
            <Text fontWeight="medium">Archive</Text>
          </Button>
          <SearchButton />
          <HamburgerMenuButton />
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
