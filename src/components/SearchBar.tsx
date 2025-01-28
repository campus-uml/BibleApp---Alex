import React, { useState } from "react";
import { useBible } from "../context/BIbleContext";
import { Button } from "./ui/button";
import { Search } from "lucide-react"; 

const SearchBar: React.FC = () => {
  const { searchBibleVerse } = useBible();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      searchBibleVerse(query);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar en la Biblia..."
        className="border rounded-lg p-2 flex-grow sm:max-w-[250px] w-4/5"
      />
      <Button
        onClick={handleSearch}
        className="p-2 rounded-lg text-sidebar-primary-foreground bg-sidebar-primary" 
      >
        <Search className="w-5 h-5" /> 
      </Button>
    </div>
  );
};

export default SearchBar;
