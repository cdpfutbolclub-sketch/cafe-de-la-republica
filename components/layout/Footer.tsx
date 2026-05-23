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
    <footer className="bg-[#1a0a04] text-[#8b6650] px-10 pt-12 pb-6">
      <div className="grid grid-cols-4 gap-10 mb-10">
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
            <h5 className="eyebrow text-[var(--red)] mb-3">{col.title}</h5>
            <ul className="space-y-2">
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
      <div className="border-t border-[#3d2010] pt-5 flex justify-between text-[11px] text-[#5a3e2b]">
        <span>© {new Date().getFullYear()} Cafe de la Republica · Andorra</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
