import Link from "next/link";

export default function StorySection() {
  return (
    <section id="story" className="flex" style={{ minHeight: "480px" }}>
      {/* Left — gradient placeholder (decorative) */}
      <div
        aria-hidden="true"
        className="w-1/2"
        style={{ background: "linear-gradient(150deg, #2c1a0e 0%, #1a0a04 100%)" }}
      >
        <div className="w-full h-full" style={{ background: "rgba(192,57,43,0.08)" }} />
      </div>

      {/* Right — text */}
      <div
        className="w-1/2 flex items-center px-16 py-16"
        style={{ background: "var(--cream-warm)" }}
      >
        <div className="max-w-sm">
          <p className="eyebrow text-[var(--red)] mb-4">Our Story</p>
          <h2 className="font-serif text-[var(--brown)] mb-5" style={{ fontSize: "2rem" }}>
            Coffee at the Crossroads of Europe
          </h2>
          <p className="text-[var(--brown-light)] text-[14px] leading-relaxed mb-5">
            Nestled in the heart of the Pyrenees, Cafe de la Republica was born from a simple belief:
            exceptional coffee deserves exceptional care. We source directly from farmers who share
            our obsession with quality, and roast each batch in small quantities to bring out the
            full character of every origin.
          </p>
          <p className="text-[var(--brown-light)] text-[14px] leading-relaxed mb-8">
            Come find us in Andorra la Vella, where the mountains meet great coffee.
          </p>
          <Link
            href="/#story"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-colors"
            style={{
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
