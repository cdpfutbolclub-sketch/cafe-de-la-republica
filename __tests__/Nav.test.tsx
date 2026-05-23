jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

import { render, screen } from "@testing-library/react";
import { LangProvider } from "@/hooks/useLang";
import Nav from "@/components/layout/Nav";

const wrap = (ui: React.ReactElement) =>
  render(<LangProvider>{ui}</LangProvider>);

test("renders cafe name", () => {
  wrap(<Nav />);
  expect(screen.getByText(/cafe de la republica/i)).toBeInTheDocument();
});

test("renders all nav links", () => {
  wrap(<Nav />);
  expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /menu/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /subscribe/i })).toBeInTheDocument();
});

test("renders cart button", () => {
  wrap(<Nav />);
  expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
});

test("renders language toggle", () => {
  wrap(<Nav />);
  expect(screen.getByRole("button", { name: /\bca\b|\ben\b/i })).toBeInTheDocument();
});
