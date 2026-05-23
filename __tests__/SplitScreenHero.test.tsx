jest.mock("gsap", () => ({
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    call: jest.fn((fn: () => void) => { fn(); return { to: jest.fn().mockReturnThis() }; }),
  })),
  set: jest.fn(),
  killTweensOf: jest.fn(),
}));

jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

import { render, screen } from "@testing-library/react";
import SplitScreenHero from "@/components/home/SplitScreenHero";

test("renders 8 navigation dots", () => {
  render(<SplitScreenHero />);
  const allButtons = screen.getAllByRole("button");
  const dotButtons = allButtons.filter(b =>
    b.getAttribute("aria-label") !== "Previous coffee" &&
    b.getAttribute("aria-label") !== "Next coffee"
  );
  expect(dotButtons).toHaveLength(8);
});

test("shows first slide content by default (Ethiopia)", () => {
  render(<SplitScreenHero />);
  expect(screen.getByText(/Ethiopia/i)).toBeInTheDocument();
  expect(screen.getByText(/Floral & Bright/i)).toBeInTheDocument();
  expect(screen.getByText(/14\.50/)).toBeInTheDocument();
});

test("renders up and down arrow navigation buttons", () => {
  render(<SplitScreenHero />);
  expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
});
