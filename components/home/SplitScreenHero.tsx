"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import CoffeeBeansBg from "@/components/shared/CoffeeBeansBg";
import { useIsMobile } from "@/hooks/useIsMobile";

function DockDot({
  motionVal, horizontal, active, dotColor, onClick, onHover, ariaLabel,
}: {
  motionVal: MotionValue<number>;
  horizontal?: boolean;
  active: boolean;
  dotColor: string;
  onClick: () => void;
  onHover: () => void;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(motionVal, (val) => {
    const el = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    return horizontal
      ? val - el.x - el.width  / 2
      : val - el.y - el.height / 2;
  });

  const range = horizontal ? [-80, 0, 80] : [-100, 0, 100];
  const sizeSync = useTransform(distance, range, [active ? 28 : 16, active ? 64 : 50, active ? 28 : 16]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={onHover}
      aria-label={ariaLabel}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: dotColor,
        border: `2.5px solid rgba(255,255,255,${active ? 0.7 : 0.3})`,
        boxShadow: active
          ? `0 0 0 5px ${dotColor}44, inset 0 0 0 5px rgba(0,0,0,0.28)`
          : `inset 0 0 0 4px rgba(0,0,0,0.22)`,
        opacity: active ? 1 : 0.55,
        flexShrink: 0,
        cursor: "pointer",
        touchAction: "manipulation",
      }}
    />
  );
}

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

export default function SplitScreenHero({ images = {} }: { images?: Record<string, string> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered,     setHovered]     = useState(false);
  const mouseY            = useMotionValue(Infinity);
  const mouseX            = useMotionValue(Infinity);
  const isMobile          = useIsMobile();
  const inBottomZoneRef   = useRef(false);
  const touchedDotIdxRef  = useRef<number | null>(null);
  const sectionRef      = useRef<HTMLElement>(null);
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

    const axis = isMobile ? "x" : "y";
    // Clear any leftover transform on the other axis
    gsap.set(bg,      { [isMobile ? "y" : "x"]: 0 });
    gsap.set(content, { [isMobile ? "y" : "x"]: 0 });

    const exitVal   = direction === "forward" ? "-100%" : "100%";
    const enterVal  = direction === "forward" ?  "100%" : "-100%";
    const textExit  = direction === "forward" ? -60 : 60;
    const textEnter = direction === "forward" ?  60 : -60;

    const tl = gsap.timeline({ onComplete: () => { isAnimatingRef.current = false; } });
    tl.to(content, { [axis]: textExit, duration: 0.35, ease: "power2.in"    }, 0);
    tl.to(content, { opacity: 0,       duration: 0.15, ease: "none"         }, 0.20);
    tl.to(bg,      { [axis]: exitVal,  duration: 0.60, ease: "power2.inOut" }, 0);
    tl.call(() => {
      setActiveIndex(newIndex);
      gsap.set(bg,      { [axis]: enterVal });
      gsap.set(content, { [axis]: textEnter, opacity: 0 });
    });
    tl.to(bg,      { [axis]: "0%", duration: 0.60, ease: "power2.inOut" });
    tl.to(content, { opacity: 1, [axis]: 0, duration: 0.45, ease: "power2.out" }, "-=0.35");
  }, [activeIndex, isMobile]);

  const next = useCallback(() => goTo((activeIndex + 1) % SLIDES.length, "forward"),  [goTo, activeIndex]);
  const prev = useCallback(() => goTo((activeIndex - 1 + SLIDES.length) % SLIDES.length, "backward"), [goTo, activeIndex]);

  // Scroll wheel — 900ms debounce
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const handleWheel = (e: WheelEvent) => {
      if (inBottomZoneRef.current) return;
      e.preventDefault();
      if (debounceTimer) return;
      debounceTimer = setTimeout(() => { debounceTimer = null; }, 900);
      if (e.deltaY > 0) next(); else prev();
    };
    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
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

  // Touch swipe — attached to section so we can preventDefault on move
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let startX = 0, startY = 0;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onMove = (e: TouchEvent) => {
      // Block browser scroll/back-gesture while swiping the hero
      e.preventDefault();
    };
    const onEnd = (e: TouchEvent) => {
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dx) >= Math.abs(dy)) {
        if (Math.abs(dx) < 40) return;
        if (dx > 0) next(); else prev();
      } else {
        if (inBottomZoneRef.current) return;
        if (Math.abs(dy) < 40) return;
        if (dy > 0) next(); else prev();
      }
    };
    section.addEventListener("touchstart", onStart, { passive: true });
    section.addEventListener("touchmove",  onMove,  { passive: false });
    section.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      section.removeEventListener("touchstart", onStart);
      section.removeEventListener("touchmove",  onMove);
      section.removeEventListener("touchend",   onEnd);
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
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left panel — image background; on mobile becomes absolute full-screen bg */}
      <div className="relative w-1/2 h-full overflow-hidden hero-left" style={{ background: "#1a0a04" }}>
        <div
          ref={leftBgRef}
          className="absolute inset-0"
          style={{ background: SLIDES[activeIndex].bg }}
        >
          {images[SLIDES[activeIndex].id] && (
            <Image src={images[SLIDES[activeIndex].id]} alt={SLIDES[activeIndex].name} fill sizes="50vw" unoptimized className="object-cover" style={{ opacity: 0.75 }} priority={SLIDES[activeIndex].id === "ethiopia"} />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,3,1,0.45) 0%, rgba(8,3,1,0.10) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(192,57,43,0.18) 0%, transparent 55%)" }} />
          {/* Extra overlay for mobile text readability */}
          <div className="absolute inset-0 mob-show" style={{ display: "none", background: "rgba(8,3,1,0.42)" }} />
        </div>
      </div>

      {/* Right panel — on mobile: full-width transparent overlay over the image */}
      <div className="relative w-1/2 h-full flex items-center justify-center hero-right" style={{ background: "#faf6f0" }}>
        <CoffeeBeansBg />
        <div ref={rightContentRef} className="mob-dark-text w-full max-w-[340px] pl-16 pr-10 mob-px">

          <p className="eyebrow text-[var(--brown-light)] mb-5">
            {slide.origin} · {slide.region}
          </p>

          <h2 className="font-serif text-[var(--brown)] leading-tight mb-2" style={{ fontSize: "2.6rem" }}>
            {slide.name}
          </h2>

          <p className="font-sans text-[var(--brown-light)] text-[10px] tracking-[0.3em] uppercase mb-6">
            {slide.roast} Roast
          </p>

          <div className="flex flex-wrap gap-2 mb-7 mob-center" style={{ justifyContent: "flex-start" }}>
            {slide.notes.map(note => (
              <span
                key={note}
                className="text-[10px] font-sans tracking-widest uppercase rounded-full text-[var(--brown-light)]"
                style={{ border: "1px solid var(--tan)", paddingTop: "6px", paddingBottom: "6px", paddingLeft: "14px", paddingRight: "14px" }}
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
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase rounded-full text-white transition-all hover:opacity-90"
            style={{ paddingTop: "12px", paddingBottom: "12px", paddingLeft: "24px", paddingRight: "24px", background: "var(--red)" }}
          >
            Shop Coffee →
          </Link>
        </div>
      </div>

      {/* Center divider line — hidden on mobile */}
      <div
        className="absolute top-0 bottom-0 left-1/2 pointer-events-none hero-divider"
        style={{ width: "2px", background: "rgba(200,169,138,0.25)", transform: "translateX(-50%)" }}
      />

      {/* Dock nav — vertical on desktop, horizontal at bottom on mobile */}
      <div
        className="absolute flex flex-col items-center gap-[7px] z-30 hero-dock"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", touchAction: "manipulation" }}
        onMouseMove={(e) => mouseY.set(e.pageY)}
        onMouseLeave={() => { mouseY.set(Infinity); }}
        onTouchMove={(e) => {
          const x = e.touches[0].clientX;
          mouseX.set(x);
          // Find which dot the finger is closest to
          const buttons = (e.currentTarget as HTMLElement).querySelectorAll("button");
          let closest = { idx: 0, dist: Infinity };
          buttons.forEach((btn, i) => {
            const rect = btn.getBoundingClientRect();
            const dist = Math.abs(x - (rect.x + rect.width / 2));
            if (dist < closest.dist) closest = { idx: i, dist };
          });
          touchedDotIdxRef.current = closest.idx;
        }}
        onTouchEnd={() => {
          mouseX.set(Infinity);
          const idx = touchedDotIdxRef.current;
          touchedDotIdxRef.current = null;
          if (idx !== null && idx !== activeIndex) {
            goTo(idx, idx > activeIndex ? "forward" : "backward");
          }
        }}
      >
        {SLIDES.map((s, i) => (
          <DockDot
            key={s.id}
            motionVal={isMobile ? mouseX : mouseY}
            horizontal={isMobile}
            active={i === activeIndex}
            dotColor={s.dotColor}
            onClick={() => goTo(i, i > activeIndex ? "forward" : "backward")}
            onHover={() => goTo(i, i > activeIndex ? "forward" : "backward")}
            ariaLabel={`${s.origin} coffee`}
          />
        ))}
      </div>


      {/* Bottom gradient + scroll-down zone */}
      <div
        className="absolute bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-center pointer-events-auto"
        style={{ height: "140px", background: "linear-gradient(to top, rgba(8,3,1,0.90) 0%, transparent 100%)" }}
        onMouseEnter={() => { inBottomZoneRef.current = true; }}
        onMouseLeave={() => { inBottomZoneRef.current = false; }}
      >
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          aria-label="Scroll down to content"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors group"
        >
          <motion.span
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[9px] tracking-[0.3em] uppercase font-sans"
          >
            Scroll
          </motion.span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center leading-none"
          >
            <span style={{ fontSize: "10px", opacity: 0.4, lineHeight: 1 }}>▼</span>
            <span style={{ fontSize: "13px", lineHeight: 1 }}>▼</span>
          </motion.span>
        </button>
      </div>

    </section>
  );
}
