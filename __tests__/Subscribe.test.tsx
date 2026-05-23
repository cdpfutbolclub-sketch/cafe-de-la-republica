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

import { render, screen, fireEvent } from "@testing-library/react";
import SubscribePage from "@/app/subscribe/page";

test("Subscribe page renders all three pill groups", () => {
  render(<SubscribePage />);
  expect(screen.getByRole("radiogroup", { name: "Frequency" })).toBeInTheDocument();
  expect(screen.getByRole("radiogroup", { name: "Size" })).toBeInTheDocument();
  expect(screen.getByRole("radiogroup", { name: "Choice" })).toBeInTheDocument();
});

test("Subscribe page shows default price for Monthly 250g", () => {
  render(<SubscribePage />);
  expect(screen.getByText("€12.99")).toBeInTheDocument();
});

test("Subscribe page updates price when size changes to 500g", () => {
  render(<SubscribePage />);
  fireEvent.click(screen.getByRole("radio", { name: "500g" }));
  expect(screen.getByText("€23.99")).toBeInTheDocument();
});

test("Subscribe page updates price when frequency changes to Weekly", () => {
  render(<SubscribePage />);
  fireEvent.click(screen.getByRole("radio", { name: "Weekly" }));
  expect(screen.getByText("€14.99")).toBeInTheDocument();
});

test("Subscribe page has a subscribe CTA button", () => {
  render(<SubscribePage />);
  expect(screen.getByRole("button", { name: /subscribe for/i })).toBeInTheDocument();
});
