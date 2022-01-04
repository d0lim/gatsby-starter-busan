import { Flex, Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import * as React from "react";

const Bio = () => {
  return (
    <Flex
      mt="24px"
      mb="48px"
      maxW="720px"
      width="100%"
      minH="80px"
      flexDir="column"
    >
      <Heading>Hello!</Heading>
      <Text>
        안녕하세요, 박학다식 하고 싶은 박이부정 개발자 <b>D0Lim</b> 입니다.
      </Text>
    </Flex>
  );
};

export default Bio;
