import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import MenuList from "@/components/menu/MenuList";
import { getMenuItems } from "@/lib/sanity/queries";

export default async function MenuPage() {
  const items = await getMenuItems().catch(() => [] as import("@/lib/sanity/queries").SanityMenuItem[]);

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
            <MenuList items={items} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
