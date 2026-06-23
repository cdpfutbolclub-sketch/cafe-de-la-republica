import Link from "next/link";

const shopLinks   = [
  { href: "/shop",             label: "All Coffees"  },
  { href: "/shop?roast=light", label: "Light Roasts" },
  { href: "/shop?roast=dark",  label: "Dark Roasts"  },
  { href: "/subscribe",        label: "Subscribe"    },
];
const visitLinks  = [
  { href: "/menu",       label: "Cafe Menu" },
  { href: "/#location",  label: "Location"  },
  { href: "/#location",  label: "Hours"     },
];
const companyLinks = [
  { href: "/#story",            label: "Our Story" },
  { href: "/contact",           label: "Contact"   },
  { href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="mob-px" style={{ background: "#1a0a04", color: "#8b6650", paddingLeft: "40px", paddingRight: "40px", paddingTop: "48px", paddingBottom: "24px" }}>
      <div className="mob-col-2 mob-gap-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "40px", maxWidth: "896px", margin: "0 auto 40px auto" }}>
        <div>
          <p className="text-white text-[11px] tracking-[0.28em] uppercase font-sans font-semibold mb-1">
            Cafe de la Republica
          </p>
          <p className="text-[#8b6650] text-[8px] tracking-[0.3em] uppercase font-sans mb-4">
            Andorra · Specialty Coffee
          </p>
          <p className="text-[13px] italic leading-relaxed text-[#8b6650]">
            Crafting exceptional coffee in the heart of the Pyrenees.
          </p>
        </div>
        {[
          { title: "Shop",    links: shopLinks    },
          { title: "Visit",   links: visitLinks   },
          { title: "Company", links: companyLinks },
        ].map(col => (
          <div key={col.title}>
            <h5 className="eyebrow text-[var(--red)]" style={{ marginBottom: "12px" }}>{col.title}</h5>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {col.links.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-[#8b6650] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: "896px", margin: "0 auto", borderTop: "1px solid #3d2010", paddingTop: "20px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#5a3e2b" }}>
        <span>© {new Date().getFullYear()} Cafe de la Republica · Andorra</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
