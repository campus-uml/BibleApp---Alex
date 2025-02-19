import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

describe("Sheet Component", () => {
  it("debe renderizar el componente Sheet", () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
          </SheetHeader>
          <SheetDescription>Description</SheetDescription>
          <SheetFooter>Footer</SheetFooter>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("Open")).toBeInTheDocument();
  });
});
