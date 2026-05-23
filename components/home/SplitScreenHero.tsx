"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import Link from "next/link";

const SLIDES = [
  {
    id: "ethiopia",
    origin: "Ethiopia", region: "Yirgacheffe",
    name: "Floral & Bright", roast: "Light",
    notes: ["Jasmine", "Bergamot", "Blueberry"],
    price: 14.50, dotColor: "#7b4fa6",
    bg: "linear-gradient(170deg, #3b1f5e 0%, #1a0a2e 60%, #0d0517 100%)",
  },
  {
    id: "colombia",
    origin: "Colombia", region: "Huila",
    name: "Smooth & Balanced", roast: "Medium",
    notes: ["Caramel", "Red Apple", "Hazelnut"],
    price: 13.00, dotColor: "#d4820a",
    bg: "linear-gradient(170deg, #7b3f10 0%, #3d1f08 60%, #1a0d03 100%)",
  },
  {
    id: "brazil",
    origin: "Brazil", region: "Santos",
    name: "Rich & Chocolatey", roast: "Dark",
    notes: ["Dark Chocolate", "Walnut", "Brown Sugar"],
    price: 12.00, dotColor: "#5c3317",
    bg: "linear-gradient(170deg, #2d1a08 0%, #150d04 60%, #0a0602 100%)",
  },
  {
    id: "kenya",
    origin: "Kenya", region: "AA",
    name: "Bold & Fruity", roast: "Light-Med",
    notes: ["Black Currant", "Berry", "Grapefruit"],
    price: 15.00, dotColor: "#c0392b",
    bg: "linear-gradient(170deg, #6b1414 0%, #350a0a 60%, #1a0303 100%)",
  },
  {
    id: "guatemala",
    origin: "Guatemala", region: "Antigua",
    name: "Bright & Nutty", roast: "Medium",
    notes: ["Brown Sugar", "Almond", "Citrus Zest"],
    price: 13.50, dotColor: "#b8860b",
    bg: "linear-gradient(170deg, #5c3d11 0%, #2d1e08 60%, #150e03 100%)",
  },
  {
    id: "costa-rica",
    origin: "Costa Rica", region: "Tarrazú",
    name: "Clean & Crisp", roast: "Medium",
    notes: ["Honey", "Green Apple", "Caramel"],
    price: 13.50, dotColor: "#2e8b57",
    bg: "linear-gradient(170deg, #0d3d1f 0%, #061e0f 60%, #030f07 100%)",
  },
  {
    id: "indonesia",
    origin: "Indonesia", region: "Sumatra",
    name: "Earthy & Full-Bodied", roast: "Dark",
    notes: ["Cedar", "Dark Cocoa", "Molasses"],
    price: 13.00, dotColor: "#8b4513",
    bg: "linear-gradient(170deg, #3d1a08 0%, #1e0d04 60%, #0d0602 100%)",
  },
  {
    id: "house-blend",
    origin: "La Republica", region: "House Blend",
    name: "Our Signature", roast: "Med-Dark",
    notes: ["Cocoa", "Toffee", "Warm Spice"],
    price: 11.50, dotColor: "#2c7a4b",
    bg: "linear-gradient(170deg, #1a2d10 0%, #0d1608 60%, #060d03 100%)",
  },
] as const;

type Slide = typeof SLIDES[number];

export default function SplitScreenHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered,     setHovered]     = useState(false);
  const leftBgRef       = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef  = useRef(false);

  const slide: Slide = SLIDES[activeIndex];

  const goTo = useCallback((newIndex: number, direction: "forward" | "backward") => {
    if (isAnimatingRef.current || newIndex === activeIndex) return;
    isAnimatingRef.current = true;

    const bg      = leftBgRef.current;
    const content = rightContentRef.current;
    if (!bg || !content) { isAnimatingRef.current = false; return; }

    const exitY  = direction === "forward" ? "-100%" : "100%";
    const enterY = direction === "forward" ?  "100%" : "-100%";

    const tl = gsap.timeline({ onComplete: () => { isAnimatingRef.current = false; } });
    tl.to(content, { opacity: 0, duration: 0.25, ease: "power1.out" }, 0);
    tl.to(bg,      { y: exitY,  duration: 0.60, ease: "power2.inOut" }, 0);
    tl.call(() => { setActiveIndex(newIndex); gsap.set(bg, { y: enterY }); });
    tl.to(bg,      { y: "0%",  duration: 0.60, ease: "power2.inOut" });
    tl.to(content, { opacity: 1, duration: 0.25, ease: "power1.in" }, "-=0.2");
  }, [activeIndex]);

  const next = useCallback(() => goTo((activeIndex + 1) % SLIDES.length, "forward"),  [goTo, activeIndex]);
  const prev = useCallback(() => goTo((activeIndex - 1 + SLIDES.length) % SLIDES.length, "backward"), [goTo, activeIndex]);

  // Scroll wheel — 900ms debounce
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (debounceTimer) return;
      debounceTimer = setTimeout(() => { debounceTimer = null; }, 900);
      if (e.deltaY > 0) next(); else prev();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [next, prev]);

  // Keyboard arrows
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") next();
      if (e.key === "ArrowUp")   prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Touch swipe — 50px minimum
  useEffect(() => {
    let touchStartY = 0;
    const handleStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleEnd   = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) next(); else prev();
    };
    window.addEventListener("touchstart", handleStart, { passive: true });
    window.addEventListener("touchend",   handleEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchend",   handleEnd);
    };
  }, [next, prev]);

  // Auto-advance 4.5s — pauses on hover
  useEffect(() => {
    if (hovered) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [hovered, next]);

  // GSAP cleanup on unmount
  useEffect(() => {
    const bg      = leftBgRef.current;
    const content = rightContentRef.current;
    return () => {
      if (bg)      gsap.killTweensOf(bg);
      if (content) gsap.killTweensOf(content);
    };
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left panel — animates up/down */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <div
          ref={leftBgRef}
          className="absolute inset-0"
          style={{ background: slide.bg }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,3,1,0.45) 0%, rgba(8,3,1,0.10) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(192,57,43,0.18) 0%, transparent 55%)" }} />
        </div>
      </div>

      {/* Right panel — static cream */}
      <div className="relative w-1/2 h-full flex items-center" style={{ background: "#faf6f0" }}>
        <div ref={rightContentRef} className="px-14 py-10 max-w-sm w-full">

          <p className="eyebrow text-[var(--brown-light)] mb-5">
            {slide.origin} · {slide.region}
          </p>

          <h2 className="font-serif text-[var(--brown)] leading-tight mb-2" style={{ fontSize: "2.6rem" }}>
            {slide.name}
          </h2>

          <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-[0.3em] uppercase mb-6">
            {slide.roast} Roast
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {slide.notes.map(note => (
              <span
                key={note}
                className="text-[10px] font-sans tracking-widest uppercase px-3 py-1 rounded-full text-[var(--brown-light)]"
                style={{ border: "1px solid var(--tan)" }}
              >
                {note}
              </span>
            ))}
          </div>

          <p className="font-serif text-[var(--brown)] mb-7" style={{ fontSize: "1.6rem" }}>
            €{slide.price.toFixed(2)} <span className="text-[var(--brown-light)] text-sm font-sans font-normal">/ 250g</span>
          </p>

          <Link
            href={`/shop/${slide.id}`}
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase px-6 py-3 rounded-full text-white transition-all hover:opacity-90"
            style={{ background: "var(--red)" }}
          >
            Shop Coffee →
          </Link>
        </div>
      </div>

      {/* Center divider + dot nav */}
      <div
        className="absolute top-0 bottom-0 left-1/2 pointer-events-none"
        style={{ width: "2px", background: "rgba(200,169,138,0.25)", transform: "translateX(-50%)" }}
      >
        <div
          className="absolute flex flex-col gap-3 pointer-events-auto"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {SLIDES.map((s, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={s.id}
                onClick={() => goTo(i, i > activeIndex ? "forward" : "backward")}
                aria-label={`${s.origin} coffee`}
                style={{
                  width:        active ? "32px" : "24px",
                  height:       active ? "32px" : "24px",
                  borderRadius: "50%",
                  background:   s.dotColor,
                  border:       `2.5px solid rgba(255,255,255,${active ? 0.7 : 0.3})`,
                  boxShadow:    active
                    ? `0 0 0 5px ${s.dotColor}44, inset 0 0 0 5px rgba(0,0,0,0.28)`
                    : `inset 0 0 0 4px rgba(0,0,0,0.22)`,
                  opacity:      active ? 1 : 0.55,
                  transition:   "all 0.3s ease",
                  flexShrink:   0,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Up arrow — above nav */}
      <button
        onClick={prev}
        aria-label="Previous coffee"
        className="absolute left-1/2 z-30 text-white/60 hover:text-white transition-colors flex items-center justify-center"
        style={{
          top: "80px",
          transform: "translateX(-50%)",
          width: "36px", height: "36px",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          background: "rgba(8,3,1,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        ↑
      </button>

      {/* Down arrow */}
      <button
        onClick={next}
        aria-label="Next coffee"
        className="absolute left-1/2 z-30 text-white/60 hover:text-white transition-colors flex items-center justify-center"
        style={{
          bottom: "20px",
          transform: "translateX(-50%)",
          width: "36px", height: "36px",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          background: "rgba(8,3,1,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        ↓
      </button>

    </section>
  );
}
