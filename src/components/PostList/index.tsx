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
      {postNodes.map((postNode, index) => {
        return (
          <PostEntry
            title={postNode.frontmatter.title}
            description={postNode.frontmatter.description}
            publishedAt={postNode.frontmatter.publishedAt}
            tags={postNode.fields.tags}
            series={postNode.fields.series}
            slug={postNode.slug}
            key={index}
          />
        );
      })}
    </Stack>
  );
};

export default PostList;
