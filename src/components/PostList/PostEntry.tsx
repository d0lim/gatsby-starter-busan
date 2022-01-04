import { Flex, Heading, HStack, StackDivider } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import * as React from "react";
import { getPostUrl } from "../../lib/util";
import { Link } from "gatsby";
import { format } from "date-fns";

type PostEntryProps = {
  title: string;
  description: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  series?: string;
  slug: { current: string };
};

const PostEntry = ({
  title,
  description,
  publishedAt,
  category,
  tags,
  series,
  slug,
}: PostEntryProps) => {
  return (
    <Link to={getPostUrl(publishedAt, slug)}>
      <Flex
        flexDir="column"
        border="1px"
        borderColor="#eeeeee"
        borderRadius="10px"
        backgroundColor="white"
        padding="24px"
      >
        <Heading fontSize="24px">{title}</Heading>
        <Text mt="8px" mb="8px">
          {description}
        </Text>
        <HStack
          spacing={4}
          divider={<StackDivider></StackDivider>}
          color="#6c6c6c"
        >
          <Text>{format(new Date(publishedAt), "yyyy. MM. dd.")}</Text>
          {category && <Text>{category}</Text>}
          {tags && (
            <HStack spacing={2}>
              {tags.map(tag => (
                <Text>#{tag}</Text>
              ))}
            </HStack>
          )}
        </HStack>
      </Flex>
    </Link>
  );
};

export default PostEntry;
