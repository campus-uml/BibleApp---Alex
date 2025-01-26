import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react'

interface SearchProps {
  onSearch: (query: string) => void;
}

export const SearchData: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Buscar</span>
      </Button>
    </form>
  )
}
