import { FC, PropsWithChildren } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import SearchBar from "@/components/SearchBar";
import { useScrollHeader } from "@/Hooks/useScrollHeader";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const isVisible = useScrollHeader();

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header
          className={`fixed flex h-16 shrink-0 items-center gap-2 px-4 z-50 w-full
            bg-white shadow-sm transition-transform  duration-500 ease-in-out
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0"
            }`}
        >
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="flex-1 max-w-[calc(100%-4rem)]">
            <SearchBar />
          </div>
        </header>

        <div className="pt-16 flex flex-1 flex-col gap-4">
          <div className="w-full flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </>
  );
};
