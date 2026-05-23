import Link from "next/link";
import Image from "next/image";
import type { SanityCoffee } from "@/lib/sanity/queries";

export default function ProductCard({ coffee }: { coffee: SanityCoffee }) {
  const bgGradient = coffee.accentColor
    ? `linear-gradient(150deg, ${coffee.accentColor}60 0%, #1a0a04 100%)`
    : "linear-gradient(150deg, #3b2510 0%, #1a0a04 100%)";

  return (
    <div className="group">
      <div
        aria-hidden="true"
        className="relative w-full mb-4 rounded-lg overflow-hidden"
        style={{ height: "200px", background: bgGradient }}
      >
        {coffee.image?.asset.url && (
          <Image
            src={coffee.image.asset.url}
            alt={coffee.nameEn}
            fill
            className="object-cover"
          />
        )}
      </div>
      <p className="eyebrow text-[var(--brown-light)] mb-1">
        {coffee.country} · {coffee.region}
      </p>
      <h3 className="font-serif text-[var(--brown)] text-lg mb-1">{coffee.nameEn}</h3>
      <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-widest uppercase mb-3">
        {coffee.roast} Roast
      </p>
      <p className="text-[13px] text-[var(--brown-light)] mb-3">
        {coffee.tastingNotes.join(" · ")}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-serif text-[var(--brown)] text-lg">
          €{coffee.price250g.toFixed(2)}
        </span>
        <Link
          href={`/shop/${coffee.slug}`}
          aria-label={`View ${coffee.country}`}
          className="font-sans text-[10px] tracking-widest uppercase px-4 py-2 rounded-full text-white hover:opacity-80 transition-opacity"
          style={{ background: "var(--red)" }}
        >
          View <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
