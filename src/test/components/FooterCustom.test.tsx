import { render } from "@testing-library/react";
import FooterCustom from "../../components/FooterCustom";
import { describe, it, expect } from "vitest";

describe("Pruebas en FooterCustom", () => {
  it("Deberia renderizar el componente", () => {
    const { getByText, getByRole, asFragment } = render(<FooterCustom />);

    const currentYear = new Date().getFullYear().toString();
    expect(getByText(`© ${currentYear} BibleApp`)).toBeInTheDocument();

    const githubLink = getByRole("link", { name: /Alex Talavera/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/Alex200207");

    const privacyPolicyLink = getByRole("link", { name: /Privacy Policy/i });
    expect(privacyPolicyLink).toHaveAttribute("href", "/privacy-policy");

    const termsOfServiceLink = getByRole("link", { name: /Terms of Service/i });
    expect(termsOfServiceLink).toHaveAttribute("href", "/terms-of-service");

    // Generate snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
