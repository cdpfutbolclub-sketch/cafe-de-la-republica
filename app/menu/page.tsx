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
        <div style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "112px", paddingBottom: "32px", background: "#1a0a04" }}>
          <div style={{ maxWidth: "896px", margin: "0 auto" }}>
            <p aria-hidden="true" className="eyebrow text-[var(--red)]" style={{ marginBottom: "12px" }}>What We Serve</p>
            <h1 className="font-serif text-white" style={{ fontSize: "2.5rem" }}>
              The Menu
            </h1>
          </div>
        </div>
        <div style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "64px", paddingBottom: "64px", background: "var(--cream)" }}>
          <div style={{ maxWidth: "896px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "64px" }}>
            <MenuList items={items} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
