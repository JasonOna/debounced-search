import { BaseSyntheticEvent, useState } from "react";

type SearchBarProps = {
  onSearch: (search: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: BaseSyntheticEvent) => {
    onSearch(event.target.value);
    setQuery(event.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search..."
      aria-label="Search"
      className="w-full max-w-7xl p-1"
    />
  );
};

export default SearchBar;
