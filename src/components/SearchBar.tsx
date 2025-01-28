import React, { useState } from "react";
import { useBible } from "../context/BIbleContext";
import { Button } from "./ui/button";

const SearchBar: React.FC = () => {
  const { searchBibleVerse } = useBible();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchBibleVerse(query);
    }
  };

  return (
    <div className="flex items-center space-x-2 ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar en la Biblia..."
        className="border rounded-lg p-2 w-full"
      />
      <Button onClick={handleSearch} className="p-2  rounded-lg transition duration-300">Buscar</Button>
    </div>
  );
};

export default SearchBar;
