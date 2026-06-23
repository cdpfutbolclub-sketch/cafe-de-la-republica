import Link from "next/link";
import CoffeeBeansBg from "@/components/shared/CoffeeBeansBg";

const PREVIEW_ITEMS = [
  { category: "Espresso",   name: "Espresso",      description: "Double shot, intense and full-bodied",         price: 2.50 },
  { category: "Filter",     name: "Filter Coffee",  description: "Single origin, V60 pour-over, rotating",       price: 3.80 },
  { category: "Cold",       name: "Cold Brew",      description: "12-hour steep, smooth and naturally sweet",    price: 4.20 },
  { category: "Pastry",     name: "Croissant",      description: "Butter croissant, baked fresh each morning",   price: 2.80 },
] as const;

export default function MenuPreview() {
  return (
    <section className="relative mob-px mob-py" style={{ background: "var(--cream-warm)", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "40px", paddingRight: "40px" }}>
      <CoffeeBeansBg />
      <div style={{ maxWidth: "896px", margin: "0 auto" }}>
        <p className="eyebrow text-[var(--brown-light)]" style={{ textAlign: "center", marginBottom: "12px" }}>Cafe Menu</p>
        <h2 className="font-serif text-[var(--brown)]" style={{ fontSize: "2.2rem", textAlign: "center", marginBottom: "48px" }}>
          A Taste of What Awaits
        </h2>

        <ul className="mob-col-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", listStyle: "none", padding: 0, margin: 0 }}>
          {PREVIEW_ITEMS.map(item => (
            <li
              key={item.name}
              className="rounded-lg"
              style={{ paddingTop: "28px", paddingBottom: "28px", paddingLeft: "32px", paddingRight: "32px", background: "var(--cream)", border: "1px solid rgba(200,169,138,0.3)" }}
            >
              <p className="eyebrow text-[var(--red)]" style={{ marginBottom: "8px" }}>{item.category}</p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "8px" }}>
                <h3 className="font-serif text-[var(--brown)]" style={{ fontSize: "1.1rem" }}>{item.name}</h3>
                <span className="font-sans text-[var(--brown)]" style={{ fontSize: "0.875rem", marginLeft: "16px" }}>
                  €{item.price.toFixed(2)}
                </span>
              </div>
              <p className="text-[var(--brown-light)] text-[13px] leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase rounded-full transition-colors"
            style={{
              paddingTop: "12px", paddingBottom: "12px", paddingLeft: "28px", paddingRight: "28px",
              border: "1px solid var(--brown)",
              color: "var(--brown)",
            }}
          >
            Full Menu <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
