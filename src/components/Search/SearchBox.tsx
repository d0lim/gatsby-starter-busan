import * as React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { FormControl, Input } from "@chakra-ui/react";
import useDebounce from "../../hooks/useDebounce";

type SearchBoxProps = {
  refine: (...args: any[]) => any;
  currentRefinement: string;
};

const SearchBox = ({ refine, currentRefinement }: SearchBoxProps) => {
  const [term, setTerm] = React.useState<string>("");
  const debouncedValue = useDebounce<string>(term, 400);
  React.useEffect(
    () => {
      refine(debouncedValue);
    },
    [debouncedValue] // Only call effect if debounced search term changes
  );

  return (
    <FormControl>
      <Input
        className="SearchInput"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => setTerm(e.target.value)}
        value={term}
        variant="flushed"
        size="lg"
        focusBorderColor="#eeeeee"
      />
    </FormControl>
  );
};

export default connectSearchBox(SearchBox);
