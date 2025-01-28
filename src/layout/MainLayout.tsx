import { FC, PropsWithChildren } from "react";
import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SearchBar from "@/components/SearchBar";

export const MainLayout: FC<PropsWithChildren> = ({ children: Children }) => {
  return (
    <>
      {" "}
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          <SearchBar />
        </header>
        <div className="flex flex-1 flex-col gap-4 ">
          <div className="w-full flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {Children}
          </div>
        </div>
      </SidebarInset>
    </>
  );
};
