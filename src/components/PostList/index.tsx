import { Flex, Center, Square, Box, Text, Stack } from "@chakra-ui/layout";
import * as React from "react";
import PostEntry from "./PostEntry";

const PostList = () => {
  return (
    <Stack>
      <PostEntry />
      <PostEntry />
      <PostEntry />
      <PostEntry />
      <PostEntry />
    </Stack>
  );
};

export default PostList;
