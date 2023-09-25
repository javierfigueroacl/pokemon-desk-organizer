import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import useFetchCardsRequest from "./useFetchCardsRequest";

const useDebouncedRefetch = (apiCall, input) => {
  const [debouncedInput] = useDebounce(input, 500);
  const { refetch } = useFetchCardsRequest(apiCall, debouncedInput);

  useEffect(() => {
    if (debouncedInput) {
      refetch();
    }
  }, [debouncedInput, refetch]);
};

export default useDebouncedRefetch;
