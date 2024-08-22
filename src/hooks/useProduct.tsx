import { useState, useEffect, useMemo } from "react";
import debounceUtil from "@/utils/debouncer";

const productURL = "https://dummyjson.com/products/search?q=";

const useProductQuery = (
  search: string,
  fetcher: (input: string) => Promise<Response> = fetch,
  debouncer = debounceUtil,
) => {
  const [responseJSON, setResponseJSON] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [debouncedFetch, teardown] = useMemo(() => {
    return debouncer((arg?: string) => fetcher(arg || ""));
  }, []);

  useEffect(() => {
    let shouldCancel = false;

    const getData = async () => {
      setIsLoading(true);

      if (search.length == 0) {
        setResponseJSON(null);
        setError(null);
        setIsLoading(false);
        return;
      }

      try {
        const data = await debouncedFetch(productURL + search);
        const results = await data?.json();
        if (shouldCancel) return;
        setResponseJSON(results);
        setError(null);
      } catch (newError) {
        if (shouldCancel) return;

        setError("something went wrong");
        setResponseJSON(null);
      }

      setIsLoading(false);
    };

    getData();
    return () => {
      shouldCancel = true;
      teardown();
    };
  }, [search]);

  return {
    responseJSON,
    isLoading,
    error,
  };
};

export default useProductQuery;
