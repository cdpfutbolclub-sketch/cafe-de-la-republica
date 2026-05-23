import { notFound } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AddToCart from "@/components/shop/AddToCart";
import { getCoffeeBySlug, getAllCoffees } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const coffees = await getAllCoffees();
  return coffees.map(c => ({ slug: c.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const coffee = await getCoffeeBySlug(slug);
  if (!coffee) notFound();

  const heroBg = coffee.heroBackground?.asset.url ?? coffee.image?.asset.url;
  const heroGradient = coffee.accentColor
    ? `linear-gradient(150deg, ${coffee.accentColor}60 0%, #1a0a04 100%)`
    : "linear-gradient(150deg, #3b2510 0%, #1a0a04 100%)";

  return (
    <>
      <div className="relative" style={{ minHeight: "35vh", background: heroGradient }}>
        {heroBg && (
          <Image src={heroBg} alt={coffee.nameEn} fill className="object-cover opacity-60" />
        )}
        <Nav />
      </div>
      <main className="px-10 py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow text-[var(--brown-light)] mb-3">
            {coffee.country} · {coffee.region}
          </p>
          <h1 className="font-serif text-[var(--brown)] mb-2" style={{ fontSize: "2.5rem" }}>
            {coffee.nameEn}
          </h1>
          <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-widest uppercase mb-4">
            {coffee.roast} Roast
          </p>
          <p className="text-[var(--brown-light)] text-[14px] leading-relaxed mb-6">
            {coffee.tastingNotes.join(" · ")}
          </p>
          <p className="font-serif text-[var(--brown)] mb-8" style={{ fontSize: "1.8rem" }}>
            €{coffee.price250g.toFixed(2)} / 250g
          </p>
          <AddToCart coffee={coffee} />
        </div>
      </main>
      <Footer />
    </>
  );
}
