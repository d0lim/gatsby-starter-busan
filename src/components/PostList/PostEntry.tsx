import { Flex, Heading, HStack, StackDivider } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import * as React from "react";
import { getPostUrl, getSeriesUrl, getTagUrl } from "../../lib/util";
import { Link } from "gatsby";
import { format } from "date-fns";
import { SeriesField, TagField } from "../../pages";

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
        <Text>{format(new Date(publishedAt), "yyyy. MM. dd.")}</Text>
        {tags && (
          <HStack spacing={2}>
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
            <Text>Series - 「 {series.name} 」</Text>
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default PostEntry;
