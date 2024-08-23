import { useState } from "react";
import SearchBar from "./components/SearchBar";
import useProductQuery from "./hooks/useProduct";
import parseData from "./utils/parseData";
import Results from "./components/Results";

function App({
  fetcher = fetch,
}: {
  fetcher?: (input: string) => Promise<Response>;
}) {
  const [query, setQuery] = useState("");
  const { responseJSON, isLoading, error } = useProductQuery(query, fetcher);

  const results = parseData(responseJSON);
  return (
    <section className="p-3 max-w-3xl">
      <SearchBar
        onSearch={(search: string) => {
          setQuery(search);
        }}
      />
      {results && <Results results={results} />}
      {isLoading && <div>searching for results</div>}
      {error && <div>{error}</div>}
    </section>
  );
}

export default App;
