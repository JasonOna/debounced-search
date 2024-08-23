import { BaseSyntheticEvent, useState } from "react";
import XMark from "./XMark";
import MagnifyingGlass from "./MagnifyingGlass";

type SearchBarProps = {
  onSearch: (search: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    onSearch(event.target.value);
    setQuery(event.target.value);
  };

  const clearResults = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    onSearch("");
    setQuery("");
  };

  return (
    <form className="w-full flex items-center">
      <label htmlFor="search">
        <MagnifyingGlass />
      </label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        aria-label="Search"
        className="w-full p-1 mb-2 focus:outline-none"
      />
      <button onClick={clearResults}>
        <XMark />
      </button>
    </form>
  );
};

export default SearchBar;
