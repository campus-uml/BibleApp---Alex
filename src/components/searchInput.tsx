import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput() {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input type="search" placeholder="Buscar en la Biblia..." className="pl-8" />
    </div>
  )
}