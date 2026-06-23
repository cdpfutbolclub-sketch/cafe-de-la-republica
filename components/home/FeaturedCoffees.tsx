import { getAllCoffees } from "@/lib/sanity/queries";
import FeaturedCoffeesCarousel from "./FeaturedCoffeesCarousel";

export default async function FeaturedCoffees() {
  const coffees = await getAllCoffees().catch(() => []);
  if (!coffees?.length) return null;
  return <FeaturedCoffeesCarousel coffees={coffees} />;
}
