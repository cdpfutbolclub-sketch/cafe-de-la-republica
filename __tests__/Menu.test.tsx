jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) =>
    <a href={href}>{children}</a>;
  MockLink.displayName = "Link";
  return MockLink;
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { LangProvider } from "@/hooks/useLang";
import MenuList from "@/components/menu/MenuList";
import type { SanityMenuItem } from "@/lib/sanity/queries";

const mockItems: SanityMenuItem[] = [
  { _id: "1", nameCa: "Espresso",  nameEn: "Espresso",
    descriptionCa: "Doble ristretto, intens",  descriptionEn: "Double shot, intense",
    price: 2.50, category: "espresso", order: 1 },
  { _id: "2", nameCa: "Americà",   nameEn: "Americano",
    descriptionCa: "Espresso amb aigua calenta", descriptionEn: "Espresso with hot water",
    price: 2.80, category: "espresso", order: 2 },
  { _id: "3", nameCa: "V60",       nameEn: "V60 Pour-over",
    descriptionCa: "Origen únic, selecció de temporada", descriptionEn: "Single origin, rotating",
    price: 3.80, category: "filter", order: 1 },
  { _id: "4", nameCa: "Croissant", nameEn: "Croissant",
    descriptionCa: "Croissant de mantega", descriptionEn: "Butter croissant",
    price: 2.80, category: "food", order: 1 },
];

function renderWithLang(ui: React.ReactElement) {
  return render(<LangProvider>{ui}</LangProvider>);
}

test("MenuList renders category headings", () => {
  renderWithLang(<MenuList items={mockItems} />);
  expect(screen.getByRole("heading", { name: "Espresso" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Filter Coffee" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Food & Pastries" })).toBeInTheDocument();
});

test("MenuList renders items in Catalan by default", () => {
  renderWithLang(<MenuList items={mockItems} />);
  expect(screen.getByText("Americà")).toBeInTheDocument();
  expect(screen.queryByText("Americano")).not.toBeInTheDocument();
});

test("MenuList renders item descriptions in Catalan by default", () => {
  renderWithLang(<MenuList items={mockItems} />);
  expect(screen.getByText("Doble ristretto, intens")).toBeInTheDocument();
});

test("MenuList renders item prices", () => {
  renderWithLang(<MenuList items={mockItems} />);
  expect(screen.getByText("€2.50")).toBeInTheDocument();
  expect(screen.getByText("€3.80")).toBeInTheDocument();
});

test("MenuList groups items by category — espresso category has 2 items", () => {
  renderWithLang(<MenuList items={mockItems} />);
  const espressoSection = screen.getByRole("region", { name: "Espresso" });
  const listItems = espressoSection.querySelectorAll("li");
  expect(listItems.length).toBe(2);
});
