import { FC, PropsWithChildren } from "react";
import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SearchData } from "@/components/SearchData";

export const MainLayout: FC<PropsWithChildren> = ({ children: Children }) => {
  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <SearchData onSearch={handleSearch} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 ">
          <div className="">
            <h1></h1>
          </div>
          <div className="w-full flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {Children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
