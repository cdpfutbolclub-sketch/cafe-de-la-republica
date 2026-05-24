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

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <>
      {categories.map(cat => {
        const catItems = items
          .filter(i => i.category === cat)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        return (
          <section key={cat} aria-labelledby={`cat-${cat}`}>
            <h2
              id={`cat-${cat}`}
              className="font-serif text-[var(--brown)] mb-6 pb-3"
              style={{ fontSize: "1.6rem", borderBottom: "1px solid rgba(200,169,138,0.3)" }}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </h2>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-5">
              {catItems.map(item => (
                <li key={item._id} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-[var(--brown)] text-base">
                      {t({ ca: item.nameCa, en: item.nameEn })}
                    </p>
                    {(item.descriptionCa ?? item.descriptionEn) && (
                      <p className="text-[var(--brown-light)] text-[13px] leading-relaxed mt-0.5">
                        {t({
                          ca: item.descriptionCa ?? item.descriptionEn ?? "",
                          en: item.descriptionEn ?? item.descriptionCa ?? "",
                        })}
                      </p>
                    )}
                  </div>
                  <span
                    aria-label={`Price: €${item.price.toFixed(2)}`}
                    className="font-sans text-[var(--brown)] text-sm shrink-0 mt-0.5"
                  >
                    €{item.price.toFixed(2)}
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
