jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

import { render, screen, fireEvent } from "@testing-library/react";
import CartDrawer from "@/components/shop/CartDrawer";
import { useCartStore } from "@/store/cart";

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
});

test("CartDrawer renders nothing when isOpen is false", () => {
  const { container } = render(<CartDrawer />);
  expect(container).toBeEmptyDOMElement();
});

test("CartDrawer shows empty message when open with no items", () => {
  useCartStore.setState({ isOpen: true });
  render(<CartDrawer />);
  expect(screen.getByText(/empty/i)).toBeInTheDocument();
});

test("CartDrawer renders cart items when open", () => {
  useCartStore.setState({
    isOpen: true,
    items: [{ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50, qty: 2 }],
  });
  render(<CartDrawer />);
  expect(screen.getByText(/Ethiopia/i)).toBeInTheDocument();
  expect(screen.getByText(/2 ×/)).toBeInTheDocument();
});

test("CartDrawer close button sets isOpen to false", () => {
  useCartStore.setState({ isOpen: true });
  render(<CartDrawer />);
  fireEvent.click(screen.getByRole("button", { name: /close cart/i }));
  expect(useCartStore.getState().isOpen).toBe(false);
});
