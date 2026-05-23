export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "espresso",
    title: "Espresso",
    items: [
      { id: "espresso-shot",    name: "Espresso",         description: "Double shot, intense and full-bodied",             price: 2.50 },
      { id: "americano",        name: "Americano",        description: "Espresso with hot water, smooth and clean",        price: 2.80 },
      { id: "cappuccino",       name: "Cappuccino",       description: "Equal parts espresso, steamed milk, and foam",     price: 3.20 },
      { id: "flat-white",       name: "Flat White",       description: "Double ristretto with velvety microfoam",          price: 3.50 },
      { id: "latte",            name: "Latte",            description: "Smooth espresso with silky steamed milk",          price: 3.50 },
      { id: "cortado",          name: "Cortado",          description: "Equal espresso and warm milk, no foam",            price: 3.00 },
    ],
  },
  {
    id: "filter",
    title: "Filter Coffee",
    items: [
      { id: "v60",              name: "V60 Pour-over",    description: "Single origin, rotating seasonal selection",       price: 3.80 },
      { id: "aeropress",        name: "Aeropress",        description: "Immersion brew, clean and bright",                 price: 3.80 },
      { id: "batch-brew",       name: "Batch Brew",       description: "House blend, fresh every 30 minutes",              price: 3.00 },
    ],
  },
  {
    id: "cold",
    title: "Cold Drinks",
    items: [
      { id: "cold-brew",        name: "Cold Brew",        description: "12-hour steep, smooth and naturally sweet",        price: 4.20 },
      { id: "iced-latte",       name: "Iced Latte",       description: "Double espresso over ice with cold milk",          price: 4.00 },
      { id: "iced-matcha",      name: "Iced Matcha",      description: "Ceremonial grade matcha, oat milk, ice",           price: 4.50 },
    ],
  },
  {
    id: "food",
    title: "Food & Pastries",
    items: [
      { id: "croissant",        name: "Croissant",        description: "Butter croissant, baked fresh each morning",       price: 2.80 },
      { id: "pain-chocolat",    name: "Pain au Chocolat", description: "Dark chocolate wrapped in buttery pastry",         price: 3.20 },
      { id: "avocado-toast",    name: "Avocado Toast",    description: "Sourdough, smashed avocado, chilli flakes",        price: 7.50 },
      { id: "granola-bowl",     name: "Granola Bowl",     description: "House granola, Greek yoghurt, seasonal fruit",     price: 6.50 },
    ],
  },
];
