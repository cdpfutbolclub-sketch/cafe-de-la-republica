import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { getAllCoffees } from "@/lib/sanity/queries";

export default async function ShopPage() {
  const coffees = await getAllCoffees();
  return (
    <>
      <div className="relative">
        <Nav />
        <div style={{ paddingTop: "112px", paddingBottom: "32px", paddingLeft: "40px", paddingRight: "40px", background: "var(--cream)" }}>
          <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <p className="eyebrow text-[var(--brown-light)]" style={{ marginBottom: "12px" }}>All Coffees</p>
            <h1 className="font-serif text-[var(--brown)]" style={{ fontSize: "2.5rem" }}>
              The Shop
            </h1>
          </div>
        </div>
      </div>
      <main style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "64px", paddingBottom: "64px", background: "var(--cream)" }}>
        <div className="mob-col-2" style={{ maxWidth: "1024px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
          {coffees.map(coffee => (
            <ProductCard key={coffee.slug} coffee={coffee} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
