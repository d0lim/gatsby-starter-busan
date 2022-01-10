import * as React from "react";
import { Link } from "gatsby";
import {
  connectStateResults,
  Highlight,
  Index,
  Snippet,
  PoweredBy,
  connectHits,
} from "react-instantsearch-dom";
import { Box, Flex, Heading, VStack, Text, Divider } from "@chakra-ui/react";
import { SearchIndexType, SearchProps } from ".";
import styled from "@emotion/styled";

type HitSchema = {
  objectID: string;
  title: string;
  description?: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
};

type PageHitProps = {
  hit: HitSchema;
};

const StyledPoweredBy = styled(PoweredBy)`
  display: flex;
  justify-content: flex-end;
`;

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <Flex
      className="HitCount"
      mt="6px"
      justifyContent="flex-end"
      alignItems="center"
    >
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </Flex>
  ) : null;
});

const PageHit = ({ hit }: PageHitProps) => {
  return (
    <Flex flexDir="column" width="100%">
      <Link to={hit.slug}>
        <Heading size="md">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Heading>
        <Text mt="4px">
          <Highlight attribute="description" hit={hit} tagName="mark" />
        </Text>
        <Text mt="4px">
          <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </Text>
      </Link>
    </Flex>
  );
};

const Hits = ({ hits }: { hits: HitSchema[] }) => {
  return (
    <VStack flexDir="column" mt="6px" spacing={4}>
      {hits.map(hit => (
        <PageHit hit={hit} key={hit.objectID} />
      ))}
    </VStack>
  );
};

const CustomHits = connectHits(Hits);

const HitsInIndex = ({ index }: { index: SearchIndexType }) => {
  return (
    <Index indexName={index.name}>
      <Divider />
      <HitCount />
      <CustomHits />
    </Index>
  );
};

const SearchResult = ({ indices }: SearchProps) => (
  <Flex flexDir="column">
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <StyledPoweredBy />
  </Flex>
);

export default SearchResult;
