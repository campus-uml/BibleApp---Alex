import React, { useState } from "react";
import { useBible } from "../context/BIbleContext";
import { Button } from "./ui/button";
import { Search, Loader2 } from "lucide-react";

const SearchBar: React.FC = () => {
  const { searchBibleVerse } = useBible();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() !== "") {
      setLoading(true);
      await searchBibleVerse(query);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSearch();
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ejemplo: 'Dios', 'fe', 'esperanza'"
        className="border rounded-lg p-2 flex-grow sm:max-w-[250px] w-4/5 dark:bg-slate-800"
        disabled={loading}
      />
      <Button
        type="submit"
        className="p-2 rounded-lg text-sidebar-primary-foreground bg-sidebar-primary dark:bg-slate-50 dark:text-slate-900"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Search className="w-5 h-5" />
        )}
      </Button>
    </form>
  );
};

export default SearchBar;
