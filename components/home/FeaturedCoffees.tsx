import Link from "next/link";
import Image from "next/image";
import { getFeaturedCoffees } from "@/lib/sanity/queries";

export default async function FeaturedCoffees() {
  const coffees = await getFeaturedCoffees();
  if (!coffees?.length) return null;

  return (
    <section style={{ background: "var(--cream)" }} className="px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <p className="eyebrow text-[var(--brown-light)] text-center mb-3">Our Coffees</p>
        <h2 className="font-serif text-[var(--brown)] text-center mb-12" style={{ fontSize: "2.2rem" }}>
          Featured Origins
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {coffees.map(coffee => {
            const bgGradient = coffee.accentColor
              ? `linear-gradient(150deg, ${coffee.accentColor}60 0%, #1a0a04 100%)`
              : "linear-gradient(150deg, #3b2510 0%, #1a0a04 100%)";

            return (
              <div key={coffee.slug} className="group">
                <div
                  className="relative w-full mb-5 rounded-lg overflow-hidden"
                  style={{ height: "220px", background: bgGradient }}
                >
                  {coffee.image?.asset.url ? (
                    <Image
                      src={coffee.image.asset.url}
                      alt={coffee.nameEn}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full" style={{ background: "rgba(8,3,1,0.15)" }} />
                  )}
                </div>

                <p className="eyebrow text-[var(--brown-light)] mb-2">
                  {coffee.country} · {coffee.region}
                </p>
                <h3 className="font-serif text-[var(--brown)] text-xl mb-1">{coffee.nameEn}</h3>
                <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-widest uppercase mb-3">
                  {coffee.roast} Roast
                </p>
                <p className="text-[13px] text-[var(--brown-light)] mb-4">
                  {coffee.tastingNotes.join(" · ")}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[var(--brown)] text-lg">
                    €{coffee.price250g.toFixed(2)}
                  </span>
                  <Link
                    href={`/shop/${coffee.slug}`}
                    aria-label={`Shop ${coffee.nameEn}`}
                    className="font-sans text-[10px] tracking-widest uppercase px-4 py-2 rounded-full text-white transition-opacity hover:opacity-80"
                    style={{ background: "var(--red)" }}
                  >
                    Shop →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
