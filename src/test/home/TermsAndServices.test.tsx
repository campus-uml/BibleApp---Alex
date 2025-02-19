import { vi, describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TermsAndServices from "../../components/home/TermsAndServices"; // Adjust the import as necessary
import { BrowserRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    BrowserRouter: ({ children }: React.PropsWithChildren<object>) => (
      <div>{children}</div>
    ),
    useNavigate: () => vi.fn(),
  };
});

describe("TermsAndServices", () => {
  it("displays the scroll area content properly", () => {
    const { container } = render(
      <BrowserRouter>
        <TermsAndServices />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
