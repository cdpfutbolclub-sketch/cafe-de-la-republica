import { useCartStore } from "@/store/cart";

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
});

test("addItem adds a new item with qty 1", () => {
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  expect(useCartStore.getState().items).toHaveLength(1);
  expect(useCartStore.getState().items[0].qty).toBe(1);
});

test("addItem increments qty for existing item", () => {
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  expect(useCartStore.getState().items).toHaveLength(1);
  expect(useCartStore.getState().items[0].qty).toBe(2);
});

test("removeItem removes item from cart", () => {
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  useCartStore.getState().removeItem("ethiopia");
  expect(useCartStore.getState().items).toHaveLength(0);
});

test("total calculates sum of price × qty", () => {
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  useCartStore.getState().addItem({ id: "kenya", name: "Bold & Fruity", origin: "Kenya", price: 15.00 });
  expect(useCartStore.getState().total()).toBe(29.50);
});

test("clearCart empties the items array", () => {
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  useCartStore.getState().clearCart();
  expect(useCartStore.getState().items).toHaveLength(0);
});

test("itemCount sums all quantities", () => {
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  useCartStore.getState().addItem({ id: "ethiopia", name: "Floral & Bright", origin: "Ethiopia", price: 14.50 });
  expect(useCartStore.getState().itemCount()).toBe(2);
});
