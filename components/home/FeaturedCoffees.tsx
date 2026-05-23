import Link from "next/link";

const FEATURED = [
  {
    id: "ethiopia",
    origin: "Ethiopia", region: "Yirgacheffe",
    name: "Floral & Bright", roast: "Light",
    notes: ["Jasmine", "Bergamot", "Blueberry"],
    price: 14.50, accentColor: "#7b4fa6",
    bg: "linear-gradient(150deg, #3b1f5e 0%, #1a0a2e 100%)",
  },
  {
    id: "kenya",
    origin: "Kenya", region: "AA",
    name: "Bold & Fruity", roast: "Light-Med",
    notes: ["Black Currant", "Berry", "Grapefruit"],
    price: 15.00, accentColor: "#c0392b",
    bg: "linear-gradient(150deg, #6b1414 0%, #1a0303 100%)",
  },
  {
    id: "house-blend",
    origin: "La Republica", region: "House Blend",
    name: "Our Signature", roast: "Med-Dark",
    notes: ["Cocoa", "Toffee", "Warm Spice"],
    price: 11.50, accentColor: "#2c7a4b",
    bg: "linear-gradient(150deg, #1a2d10 0%, #060d03 100%)",
  },
] as const;

export default function FeaturedCoffees() {
  return (
    <section style={{ background: "var(--cream)" }} className="px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="eyebrow text-[var(--brown-light)] text-center mb-3">Our Coffees</p>
        <h2 className="font-serif text-[var(--brown)] text-center mb-12" style={{ fontSize: "2.2rem" }}>
          Featured Origins
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {FEATURED.map(coffee => (
            <div key={coffee.id} className="group">
              <div
                className="w-full mb-5 rounded-lg overflow-hidden"
                style={{ height: "220px", background: coffee.bg }}
              >
                <div className="w-full h-full" style={{ background: "rgba(8,3,1,0.15)" }} />
              </div>

              <p className="eyebrow text-[var(--brown-light)] mb-2">
                {coffee.origin} · {coffee.region}
              </p>
              <h3 className="font-serif text-[var(--brown)] text-xl mb-1">{coffee.name}</h3>
              <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-widest uppercase mb-3">
                {coffee.roast} Roast
              </p>
              <p className="text-[13px] text-[var(--brown-light)] mb-4">
                {coffee.notes.join(" · ")}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-serif text-[var(--brown)] text-lg">
                  €{coffee.price.toFixed(2)}
                </span>
                <Link
                  href={`/shop/${coffee.id}`}
                  aria-label={`Shop ${coffee.name}`}
                  className="font-sans text-[10px] tracking-widest uppercase px-4 py-2 rounded-full text-white transition-opacity hover:opacity-80"
                  style={{ background: "var(--red)" }}
                >
                  Shop →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
