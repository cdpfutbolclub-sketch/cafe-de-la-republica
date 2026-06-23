"use client";
import Link from "next/link";

const maskImage =
  "linear-gradient(to bottom,white,transparent), radial-gradient(circle at top center, white, transparent)";

const rainbowColors = [
  "rgba(192,57,43,1)",
  "rgba(255,80,60,1)",
  "rgba(220,20,60,1)",
  "rgba(255,120,80,1)",
  "rgba(160,30,30,1)",
  "rgba(255,60,40,1)",
  "rgba(192,57,43,1)",
];

export default function PromoStrip() {
  return (
    <div
      className="sticky top-0 z-40 flex flex-row items-center justify-center px-4 text-center overflow-hidden"
      style={{ height: "3rem", background: "#1a0a04" }}
    >
      {/* Rainbow flow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage,
          maskComposite: "intersect",
          animation: "promo-moving-banner 6s linear infinite",
          backgroundImage: `repeating-linear-gradient(70deg, ${[...rainbowColors].map((c, i) => `${c} ${(i * 50) / rainbowColors.length}%`).join(", ")})`,
          backgroundSize: "200% 100%",
          filter: "saturate(1.6)",
        } as React.CSSProperties}
      />
      <style>{`
        @keyframes promo-moving-banner {
          from { background-position: 0% 0; }
          to   { background-position: 100% 0; }
        }
      `}</style>

      <p className="font-sans text-white text-[11px] tracking-[0.3em] uppercase relative z-10" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
        20% off your first order — use code{" "}
        <span className="font-semibold tracking-[0.4em]">BENVINGUTS</span>
      </p>

      <Link
        href="/shop"
        className="relative z-10 font-sans text-[10px] tracking-widest uppercase rounded-full transition-opacity hover:opacity-80"
        style={{ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "20px", paddingRight: "20px", marginLeft: "24px", background: "rgba(0,0,0,0.25)", color: "white", border: "1px solid rgba(255,255,255,0.35)" }}
      >
        Shop Now
      </Link>
    </div>
  );
}
