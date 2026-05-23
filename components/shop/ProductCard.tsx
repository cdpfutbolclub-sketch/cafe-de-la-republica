import Link from "next/link";
import type { Coffee } from "@/lib/coffeeData";

export default function ProductCard({ coffee }: { coffee: Coffee }) {
  return (
    <div className="group">
      <div
        aria-hidden="true"
        className="w-full mb-4 rounded-lg overflow-hidden"
        style={{ height: "200px", background: coffee.bg }}
      />
      <p className="eyebrow text-[var(--brown-light)] mb-1">
        {coffee.origin} · {coffee.region}
      </p>
      <h3 className="font-serif text-[var(--brown)] text-lg mb-1">{coffee.name}</h3>
      <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-widest uppercase mb-3">
        {coffee.roast} Roast
      </p>
      <p className="text-[13px] text-[var(--brown-light)] mb-3">
        {coffee.notes.join(" · ")}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-serif text-[var(--brown)] text-lg">
          €{coffee.price.toFixed(2)}
        </span>
        <Link
          href={`/shop/${coffee.id}`}
          aria-label={`View ${coffee.origin}`}
          className="font-sans text-[10px] tracking-widest uppercase px-4 py-2 rounded-full text-white hover:opacity-80 transition-opacity"
          style={{ background: "var(--red)" }}
        >
          View <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
