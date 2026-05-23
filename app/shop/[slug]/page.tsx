import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AddToCart from "@/components/shop/AddToCart";
import { getCoffeeBySlug, COFFEES } from "@/lib/coffeeData";

export function generateStaticParams() {
  return COFFEES.map(c => ({ slug: c.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const coffee = getCoffeeBySlug(slug);
  if (!coffee) notFound();

  return (
    <>
      <div className="relative" style={{ minHeight: "35vh", background: coffee.bg }}>
        <Nav />
      </div>
      <main className="px-10 py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow text-[var(--brown-light)] mb-3">
            {coffee.origin} · {coffee.region}
          </p>
          <h1 className="font-serif text-[var(--brown)] mb-2" style={{ fontSize: "2.5rem" }}>
            {coffee.name}
          </h1>
          <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-widest uppercase mb-4">
            {coffee.roast} Roast
          </p>
          <p className="text-[var(--brown-light)] text-[14px] leading-relaxed mb-6">
            {coffee.notes.join(" · ")}
          </p>
          <p className="font-serif text-[var(--brown)] mb-8" style={{ fontSize: "1.8rem" }}>
            €{coffee.price.toFixed(2)} / 250g
          </p>
          <AddToCart coffee={coffee} />
        </div>
      </main>
      <Footer />
    </>
  );
}
