import Nav             from "@/components/layout/Nav";
import SplitScreenHero from "@/components/home/SplitScreenHero";
import Footer          from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Nav />
        <SplitScreenHero />
      </div>

      <main>
        <div
          className="h-64 flex items-center justify-center text-sm font-sans tracking-widest uppercase"
          style={{ color: "var(--brown-light)", background: "var(--cream)" }}
        >
          Homepage sections — Plan 3
        </div>
      </main>

      <Footer />
    </>
  );
}
