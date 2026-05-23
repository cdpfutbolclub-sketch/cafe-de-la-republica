jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    <a href={href} {...rest}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

jest.mock("@/components/layout/Nav", () => {
  const MockNav = () => <nav data-testid="nav" />;
  MockNav.displayName = "Nav";
  return MockNav;
});

jest.mock("@/components/layout/Footer", () => {
  const MockFooter = () => <footer data-testid="footer" />;
  MockFooter.displayName = "Footer";
  return MockFooter;
});

import { render, screen } from "@testing-library/react";
import MenuPage from "@/app/menu/page";

test("Menu page renders all four category headings", () => {
  render(<MenuPage />);
  expect(screen.getByRole("heading", { name: "Espresso" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Filter Coffee" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Cold Drinks" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Food & Pastries" })).toBeInTheDocument();
});

test("Menu page renders espresso items with prices", () => {
  render(<MenuPage />);
  expect(screen.getByText("Cappuccino")).toBeInTheDocument();
  expect(screen.getAllByText("€3.20").length).toBeGreaterThanOrEqual(1);
});

test("Menu page renders food items with prices", () => {
  render(<MenuPage />);
  expect(screen.getByText("Avocado Toast")).toBeInTheDocument();
  expect(screen.getByText("€7.50")).toBeInTheDocument();
});
