"use client";
import { useState } from "react";
import Link from "next/link";
import LangToggle from "@/components/shared/LangToggle";
import { useCartStore } from "@/store/cart";
import { IoBagOutline, IoRestaurantOutline, IoMailOutline, IoInformationCircleOutline, IoHomeOutline, IoCloseOutline, IoMenuOutline } from "react-icons/io5";

const links = [
  { href: "/",          label: "Home",      icon: <IoHomeOutline />,                gradientFrom: "#5c3317", gradientTo: "#c8a98a" },
  { href: "/shop",      label: "Shop",      icon: <IoBagOutline />,                 gradientFrom: "#c0392b", gradientTo: "#ff6b4a" },
  { href: "/menu",      label: "Menu",      icon: <IoRestaurantOutline />,           gradientFrom: "#b8860b", gradientTo: "#f5c842" },
  { href: "/subscribe", label: "Subscribe", icon: <IoMailOutline />,                 gradientFrom: "#2e8b57", gradientTo: "#7ee8a2" },
  { href: "/#story",    label: "About",     icon: <IoInformationCircleOutline />,    gradientFrom: "#3b1f5e", gradientTo: "#a855f7" },
];

export default function Nav() {
  const itemCount = useCartStore(s => s.items.reduce((n, i) => n + i.qty, 0));
  const openCart  = useCartStore(s => s.openCart);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 z-[45] pointer-events-none"
        style={{
          height: "160px",
          background: "linear-gradient(to bottom, rgba(8,3,1,0.80) 0%, rgba(8,3,1,0.42) 52%, transparent 100%)",
        }}
      />

      {/* ── Desktop nav ── */}
      <nav
        className="absolute top-0 left-0 right-0 z-50 grid mob-hide"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          paddingTop: "24px",
          paddingBottom: "16px",
          paddingLeft: "36px",
          paddingRight: "36px",
        }}
      >
        <div className="justify-self-start">
          <Link href="/" className="block">
            <span className="text-white text-[11px] tracking-[0.28em] uppercase font-sans font-semibold leading-tight">
              Cafe de la Republica
            </span>
            <span className="block text-white/40 text-[8px] tracking-[0.3em] uppercase font-sans mt-0.5">
              Andorra · Specialty Coffee
            </span>
          </Link>
        </div>

        <ul className="justify-self-center flex gap-4">
          {links.map(({ href, label, icon, gradientFrom, gradientTo }) => (
            <li
              key={href}
              style={{ "--gradient-from": gradientFrom, "--gradient-to": gradientTo } as React.CSSProperties}
              className="relative w-[48px] h-[48px] bg-white/10 backdrop-blur-md shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[140px] hover:shadow-none group cursor-pointer border border-white/15"
            >
              <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100" />
              <span className="absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[14px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-40" />
              <span className="relative z-10 transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                <span className="text-xl text-white/70">{icon}</span>
              </span>
              <Link
                href={href}
                className="absolute inset-0 flex items-center justify-center z-10 text-white uppercase tracking-widest text-[11px] font-sans scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 delay-100"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="justify-self-end flex items-center gap-3">
          <LangToggle />
          <button
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            onClick={openCart}
            className="text-white text-[10px] tracking-[0.2em] uppercase font-sans rounded-full transition-colors"
            style={{
              paddingTop: "10px", paddingBottom: "10px", paddingLeft: "24px", paddingRight: "24px",
              background: "rgba(192,57,43,0.88)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,100,80,0.3)",
              boxShadow: "0 4px 16px rgba(192,57,43,0.3)",
            }}
          >
            Cart ({itemCount})
          </button>
        </div>
      </nav>

      {/* ── Mobile nav bar ── */}
      <nav
        className="absolute top-0 left-0 right-0 z-50 mob-show-grid"
        style={{
          display: "none",
          alignItems: "center",
          gridTemplateColumns: "auto 1fr auto",
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          gap: "12px",
        }}
      >
        {/* Left — hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          style={{ color: "white", fontSize: "26px", background: "none", border: "none", cursor: "pointer", padding: "4px", lineHeight: 1 }}
        >
          <IoMenuOutline />
        </button>

        {/* Center — logo */}
        <Link href="/" style={{ textAlign: "center" }}>
          <span className="text-white text-[10px] tracking-[0.28em] uppercase font-sans font-semibold">
            Cafe de la Republica
          </span>
        </Link>

        {/* Right — cart */}
        <button
          aria-label={`Cart, ${itemCount} items`}
          onClick={openCart}
          className="text-white text-[10px] tracking-[0.2em] uppercase font-sans rounded-full"
          style={{
            paddingTop: "8px", paddingBottom: "8px", paddingLeft: "14px", paddingRight: "14px",
            background: "rgba(192,57,43,0.88)",
            border: "1px solid rgba(255,100,80,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          Cart ({itemCount})
        </button>
      </nav>

      {/* ── Mobile fullscreen drawer ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "#1a0a04" }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 20px", borderBottom: "1px solid rgba(200,169,138,0.15)" }}>
            <span className="text-white text-[11px] tracking-[0.28em] uppercase font-sans font-semibold">
              Cafe de la Republica
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              style={{ color: "white", fontSize: "28px", background: "none", border: "none", cursor: "pointer" }}
            >
              <IoCloseOutline />
            </button>
          </div>

          {/* Links */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 32px", gap: "8px" }}>
            {links.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 0", borderBottom: "1px solid rgba(200,169,138,0.1)", textDecoration: "none" }}
              >
                <span style={{ color: "rgba(200,169,138,0.7)", fontSize: "20px" }}>{icon}</span>
                <span className="font-serif text-white" style={{ fontSize: "1.8rem" }}>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <LangToggle />
            <span className="eyebrow text-[var(--brown-light)]">Andorra · Specialty Coffee</span>
          </div>
        </div>
      )}
    </>
  );
}
