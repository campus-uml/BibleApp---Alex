import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../../components/ui/collapsible";

describe("Collapsible component", () => {
  it("should render the Collapsible component", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });
});
