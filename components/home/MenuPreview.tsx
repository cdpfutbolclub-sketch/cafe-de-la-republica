import Link from "next/link";

const PREVIEW_ITEMS = [
  { category: "Espresso",   name: "Espresso",      description: "Double shot, intense and full-bodied",         price: 2.50 },
  { category: "Filter",     name: "Filter Coffee",  description: "Single origin, V60 pour-over, rotating",       price: 3.80 },
  { category: "Cold",       name: "Cold Brew",      description: "12-hour steep, smooth and naturally sweet",    price: 4.20 },
  { category: "Pastry",     name: "Croissant",      description: "Butter croissant, baked fresh each morning",   price: 2.80 },
] as const;

export default function MenuPreview() {
  return (
    <section className="px-10 py-20" style={{ background: "var(--cream-warm)" }}>
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow text-[var(--brown-light)] text-center mb-3">Cafe Menu</p>
        <h2 className="font-serif text-[var(--brown)] text-center mb-12" style={{ fontSize: "2.2rem" }}>
          A Taste of What Awaits
        </h2>

        <ul className="grid grid-cols-2 gap-6 mb-10">
          {PREVIEW_ITEMS.map(item => (
            <li
              key={item.name}
              className="px-7 py-6 rounded-lg"
              style={{ background: "var(--cream)", border: "1px solid rgba(200,169,138,0.3)" }}
            >
              <p className="eyebrow text-[var(--red)] mb-2">{item.category}</p>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-[var(--brown)] text-lg">{item.name}</h3>
                <span className="font-sans text-[var(--brown)] text-sm ml-4">
                  €{item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-[var(--brown-light)] text-[13px] leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase px-7 py-3 rounded-full transition-colors"
            style={{
              border: "1px solid var(--brown)",
              color: "var(--brown)",
            }}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
