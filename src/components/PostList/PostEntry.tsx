import { Flex, Heading, HStack, StackDivider } from "@chakra-ui/layout";
import { Icon, Text } from "@chakra-ui/react";
import * as React from "react";
import { getPostUrl, getSeriesUrl, getTagUrl } from "../../lib/util";
import { Link } from "gatsby";
import { format } from "date-fns";
import { SeriesField, TagField } from "../../pages";
import { Book } from "@emotion-icons/fa-solid";

type PostEntryProps = {
  title: string;
  description: string;
  publishedAt: string;
  tags?: TagField[];
  series?: SeriesField;
  slug: string;
};

const PostEntry = ({
  title,
  description,
  publishedAt,
  tags,
  series,
  slug,
}: PostEntryProps) => {
  return (
    <Flex
      flexDir="column"
      border="1px"
      borderColor="#eeeeee"
      borderRadius="10px"
      backgroundColor="white"
      padding="24px"
    >
      <Link to={getPostUrl(publishedAt, slug)}>
        <Heading fontSize="24px">{title}</Heading>
      </Link>
      <Link to={getPostUrl(publishedAt, slug)}>
        <Text mt="8px" mb="8px">
          {description}
        </Text>
      </Link>

      <HStack
        spacing={4}
        divider={<StackDivider></StackDivider>}
        color="#6c6c6c"
      >
        <Text minW="95px">
          {format(new Date(publishedAt), "yyyy. MM. dd.")}
        </Text>
        {tags && (
          <HStack spacing={2} overflow="auto">
            {tags.map((tag, index) => (
              <React.Fragment key={index}>
                <Link to={getTagUrl(tag.tagSlug)}>
                  <Text>#{tag.name}</Text>
                </Link>
              </React.Fragment>
            ))}
          </HStack>
        )}
        {series && (
          <Link to={getSeriesUrl(series.seriesSlug)}>
            <Flex alignItems="center">
              <Icon as={Book} />
              <Text
                ml={2}
                display={{ base: "none", sm: "none", md: "inline-flex" }}
              >
                「 {series.name} 」
              </Text>
            </Flex>
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default PostEntry;
