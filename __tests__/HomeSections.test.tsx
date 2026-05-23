jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

import { render, screen } from "@testing-library/react";
import FeaturedCoffees from "@/components/home/FeaturedCoffees";
import PromoStrip from "@/components/home/PromoStrip";

// ── FeaturedCoffees ───────────────────────────────

test("FeaturedCoffees renders 3 coffee cards", () => {
  render(<FeaturedCoffees />);
  expect(screen.getByText(/Ethiopia/i)).toBeInTheDocument();
  expect(screen.getByText(/Kenya/i)).toBeInTheDocument();
  expect(screen.getByText(/La Republica/i)).toBeInTheDocument();
});

test("FeaturedCoffees shows shop links for each coffee", () => {
  render(<FeaturedCoffees />);
  const links = screen.getAllByRole("link", { name: /shop/i });
  expect(links.length).toBe(3);
});

// ── PromoStrip ────────────────────────────────────

test("PromoStrip shows the promo code BENVINGUTS", () => {
  render(<PromoStrip />);
  expect(screen.getByText(/BENVINGUTS/)).toBeInTheDocument();
});

test("PromoStrip shows 20% discount message", () => {
  render(<PromoStrip />);
  expect(screen.getByText(/20%/)).toBeInTheDocument();
});
