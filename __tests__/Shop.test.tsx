jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    <a href={href} {...rest}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

jest.mock("next/image", () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />;
  MockImage.displayName = "Image";
  return MockImage;
});

import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/shop/ProductCard";
import AddToCart from "@/components/shop/AddToCart";
import { useCartStore } from "@/store/cart";
import type { SanityCoffee } from "@/lib/sanity/queries";

const ethiopia: SanityCoffee = {
  _id: "test-id",
  slug: "ethiopia",
  nameCa: "Floral i Brillant",
  nameEn: "Floral & Bright",
  country: "Ethiopia",
  region: "Yirgacheffe",
  roast: "Light",
  tastingNotes: ["Jasmine", "Bergamot", "Blueberry"],
  price250g: 14.50,
  formats: ["250g"],
  featured: true,
};

test("ProductCard renders origin and price", () => {
  render(<ProductCard coffee={ethiopia} />);
  expect(screen.getByText(/Ethiopia/i)).toBeInTheDocument();
  expect(screen.getByText(/14\.50/)).toBeInTheDocument();
});

test("ProductCard has a View link to the product page", () => {
  render(<ProductCard coffee={ethiopia} />);
  const link = screen.getByRole("link", { name: /view floral & bright/i });
  expect(link).toHaveAttribute("href", "/shop/ethiopia");
});

// ── AddToCart ─────────────────────────────────────

describe("AddToCart", () => {
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
    fireEvent.click(screen.getByRole("button", { name: /Add \d+ .+ to cart/i }));
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].id).toBe("ethiopia");
    expect(useCartStore.getState().items[0].qty).toBe(1);
  });

  test("AddToCart accumulates quantity when item already in cart", () => {
    useCartStore.setState({
      items: [{ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50, qty: 2 }],
      isOpen: false,
    });
    render(<AddToCart coffee={ethiopia} />);
    fireEvent.click(screen.getByRole("button", { name: /Add \d+ .+ to cart/i }));
    expect(useCartStore.getState().items[0].qty).toBe(3);
  });
});
