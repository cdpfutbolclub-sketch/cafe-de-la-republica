"use client";
import Link from "next/link";
import LangToggle from "@/components/shared/LangToggle";

const links = [
  { href: "/shop",      label: "Shop"      },
  { href: "/menu",      label: "Menu"      },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/#story",    label: "About"     },
];

export default function Nav() {
  return (
    <>
      {/* Full-width dark gradient — makes nav readable over both panels */}
      <div
        className="absolute top-0 left-0 right-0 h-28 z-[45] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(8,3,1,0.80) 0%, rgba(8,3,1,0.42) 52%, transparent 100%)" }}
      />

      <nav
        className="absolute top-0 left-0 right-0 z-50 grid items-center px-10 py-5"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        {/* Logo — bare text, no pill */}
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

        {/* Links — glass pill, dead center */}
        <div
          className="justify-self-center flex rounded-full px-2 py-1.5"
          style={{
            background: "rgba(8,3,1,0.35)",
            backdropFilter: "blur(16px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/85 hover:text-white text-[10px] tracking-[0.2em] uppercase font-sans px-4 py-1.5 rounded-full hover:bg-white/10 transition-all"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right — lang toggle + cart */}
        <div className="justify-self-end flex items-center gap-3">
          <LangToggle />
          <button
            aria-label="cart"
            className="text-white text-[10px] tracking-[0.2em] uppercase font-sans px-5 py-2.5 rounded-full transition-colors"
            style={{
              background: "rgba(192,57,43,0.88)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,100,80,0.3)",
              boxShadow: "0 4px 16px rgba(192,57,43,0.3)",
            }}
          >
            Cart (0)
          </button>
        </div>
      </nav>
    </>
  );
}
