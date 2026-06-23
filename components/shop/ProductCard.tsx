import Link from "next/link";
import Image from "next/image";
import type { SanityCoffee } from "@/lib/sanity/queries";
import { sanityImg } from "@/lib/sanity/imageUrl";

export default function ProductCard({ coffee }: { coffee: SanityCoffee }) {
  const bgGradient = coffee.accentColor
    ? `linear-gradient(150deg, ${coffee.accentColor}60 0%, #1a0a04 100%)`
    : "linear-gradient(150deg, #3b2510 0%, #1a0a04 100%)";

  const imgUrl = coffee.productImage?.asset.url ?? coffee.image?.asset.url;

  return (
    <div className="group">
      <div
        aria-hidden="true"
        className="relative w-full rounded-lg overflow-hidden"
        style={{ height: "200px", background: bgGradient, marginBottom: "16px" }}
      >
        {imgUrl && (
          <Image
            src={sanityImg(imgUrl, 600)}
            alt={coffee.nameEn}
            fill
            sizes="300px"
            className="object-cover"
          />
        )}
      </div>
      <p className="eyebrow text-[var(--brown-light)]" style={{ marginBottom: "4px" }}>
        {coffee.country} · {coffee.region}
      </p>
      <h3 className="font-serif text-[var(--brown)]" style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{coffee.nameEn}</h3>
      <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-widest uppercase" style={{ marginBottom: "8px" }}>
        {coffee.roast} Roast
      </p>
      <p className="text-[13px] text-[var(--brown-light)]" style={{ marginBottom: "12px" }}>
        {coffee.tastingNotes.join(" · ")}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="font-serif text-[var(--brown)]" style={{ fontSize: "1.1rem" }}>
          €{coffee.price250g.toFixed(2)}
        </span>
        <Link
          href={`/shop/${coffee.slug}`}
          aria-label={`View ${coffee.nameEn}`}
          className="font-sans text-[10px] tracking-widest uppercase rounded-full text-white hover:opacity-80 transition-opacity"
          style={{ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "16px", paddingRight: "16px", background: "var(--red)" }}
        >
          View <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
