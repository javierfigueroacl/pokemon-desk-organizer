import { useEffect } from "react";
import { useDebounce } from "use-debounce";

const useDebouncedRefetch = (fetch, request, data) => {
  const [debouncedData] = useDebounce(data, 500);
  const { refetch } = fetch(request, debouncedData);

  useEffect(() => {
    if (debouncedData) {
      refetch();
    }
  }, [debouncedData, refetch]);

  return { debouncedData };
};

export default useDebouncedRefetch;
