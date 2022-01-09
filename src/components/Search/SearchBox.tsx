import * as React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { FormControl, Input } from "@chakra-ui/react";

type SearchBoxProps = {
  refine: (...args: any[]) => any;
  currentRefinement: string;
};

const SearchBox = ({ refine, currentRefinement }: SearchBoxProps) => {
  return (
    <FormControl>
      <Input
        className="SearchInput"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        variant="flushed"
        size="lg"
      />
    </FormControl>
  );
};

export default connectSearchBox(SearchBox);
