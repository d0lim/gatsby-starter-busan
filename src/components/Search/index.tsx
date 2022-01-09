import { Box, Flex } from "@chakra-ui/react";
import algoliasearch from "algoliasearch";
import * as React from "react";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";

export type SearchIndexType = {
  name: string;
  title: string;
};

export type SearchProps = {
  indices: SearchIndexType[];
};

const Search = ({ indices }: SearchProps) => {
  const [query, setQuery] = React.useState<string>();
  const [show, setShow] = React.useState<boolean>(false);

  const searchClient = React.useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID || "",
        process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
      ),
    []
  );

  return (
    <Flex width="100%" flexDir="column">
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }: { query: string }) => {
          setQuery(query);
          if (query.length > 0) setShow(true);
          else setShow(false);
        }}
      >
        <SearchBox />
        {show && <SearchResult indices={indices} />}
      </InstantSearch>
    </Flex>
  );
};

export default Search;
