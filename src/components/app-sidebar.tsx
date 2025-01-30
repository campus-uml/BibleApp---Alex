import * as React from "react";
import { GalleryVerticalEnd, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { TabBible } from "./TabBible";
import { SearchInput } from "../components/searchInput";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-col space-y-2 p-2">
        <div className="flex items-center justify-between">
          <SidebarMenuButton size="sm" asChild>
            <a href="#" className="flex items-center space-x-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <span className="font-semibold">BibleApp</span>
            </a>
          </SidebarMenuButton>
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
              <TooltipContent>
                <p>Buscar en la Biblia</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {showSearch && <SearchInput />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <TabBible />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
