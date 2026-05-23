jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    <a href={href} {...rest}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/shop/ProductCard";
import AddToCart from "@/components/shop/AddToCart";
import { useCartStore } from "@/store/cart";
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

// ── AddToCart ─────────────────────────────────────

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
});

test("AddToCart renders with default quantity 1 and correct price", () => {
  render(<AddToCart coffee={ethiopia} />);
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText(/Add to Cart — €14\.50/)).toBeInTheDocument();
});

test("AddToCart increase button increments quantity and updates price", () => {
  render(<AddToCart coffee={ethiopia} />);
  fireEvent.click(screen.getByRole("button", { name: /increase quantity/i }));
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText(/€29\.00/)).toBeInTheDocument();
});

test("AddToCart decrease button cannot go below 1", () => {
  render(<AddToCart coffee={ethiopia} />);
  fireEvent.click(screen.getByRole("button", { name: /decrease quantity/i }));
  expect(screen.getByText("1")).toBeInTheDocument();
});

test("AddToCart adds item to cart store when clicked", () => {
  render(<AddToCart coffee={ethiopia} />);
  fireEvent.click(screen.getByRole("button", { name: /Add to Cart/i }));
  expect(useCartStore.getState().items).toHaveLength(1);
  expect(useCartStore.getState().items[0].id).toBe("ethiopia");
});
