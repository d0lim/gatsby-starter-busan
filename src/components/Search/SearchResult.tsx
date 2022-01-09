import * as React from "react";
import { Link } from "gatsby";
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom";
import { Box, Heading } from "@chakra-ui/react";
import { SearchIndexType, SearchProps } from ".";

type PageHitProps = {
  hit: {
    objectID: string;
    title: string;
    description?: string;
    slug: string;
    excerpt?: string;
    tags?: string[];
  };
};

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <Box className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </Box>
  ) : null;
});

const PageHit = ({ hit }: PageHitProps) => {
  return (
    <Box>
      <Link to={hit.slug}>
        <Heading size="sm">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Heading>
      </Link>
      <Highlight attribute="description" hit={hit} tagName="mark" />
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </Box>
  );
};

const HitsInIndex = ({ index }: { index: SearchIndexType }) => {
  return (
    <Index indexName={index.name}>
      <HitCount />
      <Hits hitComponent={PageHit} />
    </Index>
  );
};

const SearchResult = ({ indices }: SearchProps) => (
  <Box>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </Box>
);

export default SearchResult;
