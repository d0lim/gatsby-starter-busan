import { Flex, Heading } from "@chakra-ui/layout";
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
    >
      <Heading size="lg">Post TItle</Heading>
      <Text>Post Description lorem ipsum blabla</Text>
      <Flex>
        <Text>2022.01.01</Text>
        <Text>Category</Text>
        <Flex>
          <Text>Tag1</Text>
          <Text>Tag2</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostEntry;
