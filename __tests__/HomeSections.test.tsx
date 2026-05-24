jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>;
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

jest.mock("@/lib/sanity/queries", () => ({
  getFeaturedCoffees: jest.fn(),
  getSiteSettings: jest.fn(),
}));

import { render, screen } from "@testing-library/react";
import FeaturedCoffees from "@/components/home/FeaturedCoffees";
import PromoStrip from "@/components/home/PromoStrip";
import SubscriptionTeaser from "@/components/home/SubscriptionTeaser";
import StorySection from "@/components/home/StorySection";
import MenuPreview from "@/components/home/MenuPreview";
import LocationSection from "@/components/home/LocationSection";
import { getFeaturedCoffees, getSiteSettings } from "@/lib/sanity/queries";
import type { SanityCoffee } from "@/lib/sanity/queries";

const mockFeaturedCoffees: SanityCoffee[] = [
  { _id: "1", slug: "ethiopia", nameCa: "Floral i Brillant", nameEn: "Floral & Bright",
    country: "Ethiopia", region: "Yirgacheffe", roast: "Light", tastingNotes: ["Jasmine", "Bergamot", "Blueberry"],
    price250g: 14.50, formats: ["250g"], featured: true },
  { _id: "2", slug: "kenya", nameCa: "Atrevit i Fruitat", nameEn: "Bold & Fruity",
    country: "Kenya", region: "AA", roast: "Light-Med", tastingNotes: [],
    price250g: 15.00, formats: ["250g"], featured: true },
  { _id: "3", slug: "house-blend", nameCa: "La Nostra Signatura", nameEn: "Our Signature",
    country: "La Republica", region: "House Blend", roast: "Med-Dark", tastingNotes: [],
    price250g: 11.50, formats: ["250g"], featured: true },
];

beforeEach(() => {
  (getFeaturedCoffees as jest.Mock).mockResolvedValue(mockFeaturedCoffees);
  (getSiteSettings as jest.Mock).mockResolvedValue({});
});

// ── FeaturedCoffees ───────────────────────────────

test("FeaturedCoffees renders 3 coffee cards", async () => {
  const el = await FeaturedCoffees();
  render(el);
  expect(screen.getByText(/Ethiopia/i)).toBeInTheDocument();
  expect(screen.getByText(/Kenya/i)).toBeInTheDocument();
  expect(screen.getByText(/La Republica/i)).toBeInTheDocument();
});

test("FeaturedCoffees shows shop links for each coffee", async () => {
  const el = await FeaturedCoffees();
  render(el);
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

// ── SubscriptionTeaser ────────────────────────────

test("SubscriptionTeaser renders frequency options", () => {
  render(<SubscriptionTeaser />);
  expect(screen.getByText("Weekly")).toBeInTheDocument();
  expect(screen.getByText("Bi-weekly")).toBeInTheDocument();
  expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
});

test("SubscriptionTeaser renders size options", () => {
  render(<SubscriptionTeaser />);
  expect(screen.getByText("250g")).toBeInTheDocument();
  expect(screen.getByText("500g")).toBeInTheDocument();
  expect(screen.getByText("1kg")).toBeInTheDocument();
});

test("SubscriptionTeaser has a CTA link to /subscribe", () => {
  render(<SubscriptionTeaser />);
  const link = screen.getByRole("link", { name: /subscribe|start/i });
  expect(link).toHaveAttribute("href", "/subscribe");
});

// ── StorySection ──────────────────────────────────

test("StorySection renders the story heading", () => {
  render(<StorySection />);
  expect(screen.getByText("Our Story")).toBeInTheDocument();
});

test("StorySection has a Read Our Story link", () => {
  render(<StorySection />);
  const link = screen.getByRole("link", { name: /read our story/i });
  expect(link).toHaveAttribute("href", "/#story");
});

// ── MenuPreview ───────────────────────────────────

test("MenuPreview renders 4 menu item cards", () => {
  render(<MenuPreview />);
  const items = screen.getAllByRole("listitem");
  expect(items.length).toBe(4);
});

test("MenuPreview has a Full Menu link to /menu", () => {
  render(<MenuPreview />);
  const link = screen.getByRole("link", { name: /full menu/i });
  expect(link).toHaveAttribute("href", "/menu");
});

// ── LocationSection ───────────────────────────────

test("LocationSection renders the address", async () => {
  const el = await LocationSection();
  render(el);
  expect(screen.getByText(/Andorra/i)).toBeInTheDocument();
});

test("LocationSection renders hours", async () => {
  const el = await LocationSection();
  render(el);
  expect(screen.getByText(/Mon/i)).toBeInTheDocument();
});

test("LocationSection renders contact email", async () => {
  const el = await LocationSection();
  render(el);
  expect(screen.getByText(/caferepublica/i)).toBeInTheDocument();
});
