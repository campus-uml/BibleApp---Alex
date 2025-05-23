import * as React from "react";
import { Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { TabBible } from "./TabBible";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropdownUser } from "./DropdownUser";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SearchBook from "./SearchBook";
import BibleApp from "../assets/bible-icon.svg";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { avatarUrl } = useAuth();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-col space-y-2 p-2">
        <div className="flex items-center justify-between">
          <SidebarMenuButton size="sm" asChild>
            <a href="#" className="flex items-center space-x-2">
              <div className="flex aspect-square size-8">
                <img src={BibleApp} className="bg-transparent dark:invert" />
              </div>
              <span className="font-semibold">BibleApp</span>
            </a>
          </SidebarMenuButton>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <DropdownUser avatarUrl={avatarUrl} />
          </div>
        </div>
        {showSearch && <SearchBook onSearch={handleSearch} />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <TabBible searchTerm={searchTerm} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
