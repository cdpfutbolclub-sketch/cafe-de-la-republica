import Nav    from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <div className="h-screen bg-[#1a0a04] relative flex items-center justify-center">
        <Nav />
        <p className="text-white/30 text-sm font-sans tracking-widest uppercase">
          Hero — Plan 2
        </p>
      </div>

      <main>
        <div className="h-64 flex items-center justify-center text-[#8b6650] text-sm font-sans tracking-widest uppercase" style={{ background: "var(--cream)" }}>
          Homepage sections — Plan 3
        </div>
      </main>

      <Footer />
    </>
  );
}
