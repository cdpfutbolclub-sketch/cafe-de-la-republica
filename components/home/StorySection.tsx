import Link from "next/link";
import CoffeeBeansBg from "@/components/shared/CoffeeBeansBg";

export default function StorySection() {
  return (
    <section id="story" className="flex mob-stack" style={{ minHeight: "480px" }}>
      {/* Left — gradient placeholder (hidden on mobile) */}
      <div
        aria-hidden="true"
        className="w-1/2 mob-hide"
        style={{ background: "linear-gradient(150deg, #2c1a0e 0%, #1a0a04 100%)" }}
      >
        <div className="w-full h-full" style={{ background: "rgba(192,57,43,0.08)" }} />
      </div>

      {/* Right — text */}
      <div
        className="w-1/2 flex items-center relative mob-full mob-px mob-py"
        style={{ background: "var(--cream-warm)", paddingTop: "64px", paddingBottom: "64px", paddingLeft: "80px", paddingRight: "64px" }}
      >
        <CoffeeBeansBg />
        <div className="max-w-sm">
          <p className="eyebrow text-[var(--red)]" style={{ marginBottom: "16px" }}>Our Story</p>
          <h2 className="font-serif text-[var(--brown)]" style={{ fontSize: "2rem", marginBottom: "20px" }}>
            Coffee at the Crossroads of Europe
          </h2>
          <p className="text-[var(--brown-light)] text-[14px] leading-relaxed" style={{ marginBottom: "16px" }}>
            Nestled in the heart of the Pyrenees, Cafe de la Republica was born from a simple belief:
            exceptional coffee deserves exceptional care. We source directly from farmers who share
            our obsession with quality, and roast each batch in small quantities to bring out the
            full character of every origin.
          </p>
          <p className="text-[var(--brown-light)] text-[14px] leading-relaxed" style={{ marginBottom: "40px" }}>
            Come find us in Andorra la Vella, where the mountains meet great coffee.
          </p>
          <Link
            href="/#story"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase rounded-full transition-colors"
            style={{
              paddingTop: "12px", paddingBottom: "12px", paddingLeft: "24px", paddingRight: "24px",
              border: "1px solid var(--brown)",
              color: "var(--brown)",
            }}
          >
            Read Our Story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
