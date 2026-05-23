import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { MENU_CATEGORIES } from "@/lib/menuData";

export default function MenuPage() {
  return (
    <>
      <div className="relative">
        <Nav />
      </div>
      <main>
        <div className="px-10 pt-12 pb-8" style={{ background: "#1a0a04" }}>
          <div className="max-w-4xl mx-auto">
            <p aria-hidden="true" className="eyebrow text-[var(--red)] mb-3">What We Serve</p>
            <h1 className="font-serif text-white" style={{ fontSize: "2.5rem" }}>
              The Menu
            </h1>
          </div>
        </div>
        <div className="px-10 py-16" style={{ background: "var(--cream)" }}>
          <div className="max-w-4xl mx-auto space-y-16">
            {MENU_CATEGORIES.map(category => (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <h2
                  id={`cat-${category.id}`}
                  className="font-serif text-[var(--brown)] mb-6 pb-3"
                  style={{ fontSize: "1.6rem", borderBottom: "1px solid rgba(200,169,138,0.3)" }}
                >
                  {category.title}
                </h2>
                <ul className="grid grid-cols-2 gap-x-12 gap-y-5">
                  {category.items.map(item => (
                    <li key={item.id} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-serif text-[var(--brown)] text-base">{item.name}</p>
                        <p className="text-[var(--brown-light)] text-[13px] leading-relaxed mt-0.5">
                          {item.description}
                        </p>
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
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
