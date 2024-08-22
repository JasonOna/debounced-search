import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import useProductQuery from "./hooks/useProduct";

function App() {
  const [query, setQuery] = useState("");
  const { responseJSON, isLoading, error } = useProductQuery(query);

  return (
    <section className="p-3">
      <SearchBar
        onSearch={(search: string) => {
          setQuery(search);
        }}
      />
      <div>{JSON.stringify(responseJSON)}</div>
      <div>{JSON.stringify(isLoading)}</div>
      <div>{JSON.stringify(error)}</div>
    </section>
  );
}

export default App;
