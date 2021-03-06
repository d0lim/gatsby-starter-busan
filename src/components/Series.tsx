import {
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { Book } from "@emotion-icons/fa-solid";
import { Link } from "gatsby";
import * as React from "react";
import { getPostUrl, getSeriesUrl } from "../lib/util";

type SeriesProps = {
  currentTitle: string;
  seriesTitle: string;
  seriesSlug: string;
  edges: {
    node: {
      frontmatter: {
        title: string;
        publishedAt: string;
      };
      slug: string;
    };
  }[];
};

const Series = ({
  currentTitle,
  seriesTitle,
  seriesSlug,
  edges,
}: SeriesProps) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  return (
    <Flex
      flexDir="column"
      width="100%"
      backgroundColor="#e0e0e0"
      padding="24px"
      borderRadius="4px"
      mt="12px"
    >
      <Heading size="lg" mb={4}>
        <Icon as={Book} mr={2} />
        <Link to={getSeriesUrl(seriesSlug)}>{seriesTitle}</Link>
      </Heading>
      {expand ? (
        <>
          <OrderedList pl={4}>
            {edges.map((edge, index) =>
              currentTitle === edge.node.frontmatter.title ? (
                <ListItem key={index} mt={1} fontWeight="bold">
                  <Link
                    to={getPostUrl(
                      edge.node.frontmatter.publishedAt,
                      edge.node.slug
                    )}
                  >
                    {edge.node.frontmatter.title}
                  </Link>
                </ListItem>
              ) : (
                <ListItem key={index} mt={1}>
                  <Link
                    to={getPostUrl(
                      edge.node.frontmatter.publishedAt,
                      edge.node.slug
                    )}
                  >
                    {edge.node.frontmatter.title}
                  </Link>
                </ListItem>
              )
            )}
          </OrderedList>
          <Flex mt={4} cursor="pointer" onClick={() => setExpand(false)}>
            ▲ Collapse post list
          </Flex>
        </>
      ) : (
        <Flex cursor="pointer" onClick={() => setExpand(true)}>
          ▶ Expand post list
        </Flex>
      )}
    </Flex>
  );
};

export default Series;
