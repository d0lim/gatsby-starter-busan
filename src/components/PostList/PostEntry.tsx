import { Flex, Heading, HStack, StackDivider } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import * as React from "react";

const PostEntry = () => {
  return (
    <Flex
      flexDir="column"
      border="1px"
      borderColor="#eeeeee"
      borderRadius="10px"
      backgroundColor="white"
      padding="24px"
    >
      <Heading fontSize="24px">Post Title</Heading>
      <Text mt="8px" mb="8px">
        Post Description lorem ipsum blabla
      </Text>
      <HStack
        spacing={4}
        divider={<StackDivider></StackDivider>}
        color="#6c6c6c"
      >
        <Text>2022.01.01</Text>
        <Text>Category</Text>
        <HStack spacing={2}>
          <Text>#Tag1</Text>
          <Text>#Tag2</Text>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default PostEntry;
