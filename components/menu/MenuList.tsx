"use client";
import { useLang } from "@/hooks/useLang";
import type { SanityMenuItem } from "@/lib/sanity/queries";

const CATEGORY_LABELS: Record<string, string> = {
  espresso: "Espresso",
  filter: "Filter Coffee",
  cold: "Cold Drinks",
  food: "Food & Pastries",
};

export default function MenuList({ items }: { items: SanityMenuItem[] }) {
  const { t } = useLang();

  if (items.length === 0) {
    return <p className="text-[var(--brown-light)]">Menu coming soon.</p>;
  }

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <>
      {categories.map(cat => {
        const catItems = items.filter(i => i.category === cat);

        return (
          <section key={cat} aria-labelledby={`cat-${cat}`}>
            <h2
              id={`cat-${cat}`}
              className="font-serif text-[var(--brown)]"
              style={{ fontSize: "1.6rem", borderBottom: "1px solid rgba(200,169,138,0.3)", marginBottom: "24px", paddingBottom: "12px" }}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </h2>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: "48px", rowGap: "20px", listStyle: "none", padding: 0, margin: 0 }}>
              {catItems.map(item => (
                <li key={item._id} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                  <div>
                    <p className="font-serif text-[var(--brown)] text-base">
                      {t({ ca: item.nameCa, en: item.nameEn })}
                    </p>
                    {(item.descriptionCa ?? item.descriptionEn) && (
                      <p className="text-[var(--brown-light)] text-[13px] leading-relaxed" style={{ marginTop: "2px" }}>
                        {t({
                          ca: item.descriptionCa ?? item.descriptionEn ?? "",
                          en: item.descriptionEn ?? item.descriptionCa ?? "",
                        })}
                      </p>
                    )}
                  </div>
                  <span
                    aria-label={item.price != null ? `Price: €${item.price.toFixed(2)}` : "Price not set"}
                    className="font-sans text-[var(--brown)] text-sm"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  >
                    {item.price != null ? `€${item.price.toFixed(2)}` : "—"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
