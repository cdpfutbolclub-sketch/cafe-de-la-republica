jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    <a href={href} {...rest}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/shop/ProductCard";
import { COFFEES } from "@/lib/coffeeData";

const ethiopia = COFFEES[0]; // id: "ethiopia", origin: "Ethiopia", price: 14.50

test("ProductCard renders origin and price", () => {
  render(<ProductCard coffee={ethiopia} />);
  expect(screen.getByText(/Ethiopia/i)).toBeInTheDocument();
  expect(screen.getByText(/14\.50/)).toBeInTheDocument();
});

test("ProductCard has a View link to the product page", () => {
  render(<ProductCard coffee={ethiopia} />);
  const link = screen.getByRole("link", { name: /view ethiopia/i });
  expect(link).toHaveAttribute("href", "/shop/ethiopia");
});
