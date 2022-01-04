import { Flex, Center, Square, Box, Text, Stack } from "@chakra-ui/layout";
import * as React from "react";
import { PostNode } from "../../pages";
import PostEntry from "./PostEntry";

type PostListProps = {
  postNodes: PostNode[];
};

const PostList = ({ postNodes }: PostListProps) => {
  return (
    <Stack width="100%" maxWidth="720px" spacing={6}>
      {postNodes.map(postNode => {
        return (
          <PostEntry
            title={postNode.title}
            description={postNode.description}
            publishedAt={postNode.publishedAt}
            category={postNode.categories && postNode.categories[0].title}
            tags={postNode.tags && postNode.tags.map(tag => tag.title)}
            series={postNode.series && postNode.series[0].title}
            slug={postNode.slug}
          />
        );
      })}
    </Stack>
  );
};

export default PostList;
