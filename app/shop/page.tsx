import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { COFFEES } from "@/lib/coffeeData";

export default function ShopPage() {
  return (
    <>
      <div className="relative">
        <Nav />
        <div className="pt-28 pb-8 px-10" style={{ background: "var(--cream)" }}>
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow text-[var(--brown-light)] mb-3">All Coffees</p>
            <h1 className="font-serif text-[var(--brown)]" style={{ fontSize: "2.5rem" }}>
              The Shop
            </h1>
          </div>
        </div>
      </div>
      <main className="px-10 py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-8">
          {COFFEES.map(coffee => (
            <ProductCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
