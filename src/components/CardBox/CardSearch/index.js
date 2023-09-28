import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import apiGetCards from "../../../api/cardApi";
import Search from "../../form/Search";
import useFetchCardsRequest from "../../form/Search/useFetchCardsRequest";

const CardSearch = () => {
  const [input, setInput] = useState(null);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const [debouncedInput] = useDebounce(input, 500);
  const { refetch } = useFetchCardsRequest(apiGetCards, debouncedInput);

  useEffect(() => {
    if (debouncedInput) {
      refetch();
    }
  }, [debouncedInput, refetch]);

  return (
    <Search
      placeholder="Search Cards as you type..."
      onChange={onInputChange}
      input={input}
    />
  );
};

export default CardSearch;
