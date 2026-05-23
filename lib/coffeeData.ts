export interface Coffee {
  id: string;
  origin: string;
  region: string;
  name: string;
  roast: string;
  notes: string[];
  price: number;
  dotColor: string;
  bg: string;
}

export const COFFEES: Coffee[] = [
  {
    id: "ethiopia",
    origin: "Ethiopia", region: "Yirgacheffe",
    name: "Floral & Bright", roast: "Light",
    notes: ["Jasmine", "Bergamot", "Blueberry"],
    price: 14.50, dotColor: "#7b4fa6",
    bg: "linear-gradient(150deg, #3b1f5e 0%, #1a0a2e 100%)",
  },
  {
    id: "colombia",
    origin: "Colombia", region: "Huila",
    name: "Caramel & Nutty", roast: "Medium",
    notes: ["Caramel", "Hazelnut", "Brown Sugar"],
    price: 13.50, dotColor: "#e67e22",
    bg: "linear-gradient(150deg, #5e2d0e 0%, #2a0e02 100%)",
  },
  {
    id: "brazil",
    origin: "Brazil", region: "Cerrado",
    name: "Rich & Smooth", roast: "Medium-Dark",
    notes: ["Dark Chocolate", "Almond", "Cedar"],
    price: 12.50, dotColor: "#2980b9",
    bg: "linear-gradient(150deg, #1a2c4e 0%, #070f1c 100%)",
  },
  {
    id: "kenya",
    origin: "Kenya", region: "AA",
    name: "Bold & Fruity", roast: "Light-Med",
    notes: ["Black Currant", "Berry", "Grapefruit"],
    price: 15.00, dotColor: "#c0392b",
    bg: "linear-gradient(150deg, #6b1414 0%, #1a0303 100%)",
  },
  {
    id: "guatemala",
    origin: "Guatemala", region: "Antigua",
    name: "Spiced & Bright", roast: "Medium",
    notes: ["Cinnamon", "Brown Sugar", "Citrus"],
    price: 13.00, dotColor: "#27ae60",
    bg: "linear-gradient(150deg, #1a3d1a 0%, #061006 100%)",
  },
  {
    id: "costa-rica",
    origin: "Costa Rica", region: "Tarrazú",
    name: "Clean & Bright", roast: "Light",
    notes: ["Honey", "Peach", "Jasmine"],
    price: 14.00, dotColor: "#f39c12",
    bg: "linear-gradient(150deg, #4a2c0a 0%, #1a0e02 100%)",
  },
  {
    id: "indonesia",
    origin: "Indonesia", region: "Sumatra",
    name: "Earthy & Full", roast: "Dark",
    notes: ["Earth", "Cedar", "Dark Chocolate"],
    price: 13.50, dotColor: "#8e44ad",
    bg: "linear-gradient(150deg, #2c1a3e 0%, #0c0614 100%)",
  },
  {
    id: "house-blend",
    origin: "La Republica", region: "House Blend",
    name: "Our Signature", roast: "Med-Dark",
    notes: ["Cocoa", "Toffee", "Warm Spice"],
    price: 11.50, dotColor: "#2c7a4b",
    bg: "linear-gradient(150deg, #1a2d10 0%, #060d03 100%)",
  },
];

export function getCoffeeBySlug(slug: string): Coffee | undefined {
  return COFFEES.find(c => c.id === slug);
}
