import React from "react";
import CoffeeBeansBg from "@/components/shared/CoffeeBeansBg";
import { getSiteSettings } from "@/lib/sanity/queries";
import type { SanitySiteSettings } from "@/lib/sanity/queries";

const FALLBACK = {
  address: "Carrer de la Unió, 7\nAD500 Andorra la Vella\nAndorra",
  hoursMF:  "7:00 – 19:00",
  hoursSat: "8:00 – 20:00",
  hoursSun: "9:00 – 17:00",
  phone:    "+376 000 000",
  email:    "hello@caferepublica.ad",
  instagramUrl: "https://instagram.com/caferepublica",
};

export default async function LocationSection() {
  const raw = await getSiteSettings().catch(() => null);
  const settings: SanitySiteSettings = raw ?? {};
  const {
    address,
    hoursMF,
    hoursSat,
    hoursSun,
    phone,
    email,
    instagramUrl,
  } = { ...FALLBACK, ...settings };

  return (
    <section id="location" className="relative" style={{ background: "#1a0a04", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "40px", paddingRight: "40px" }}>
      <CoffeeBeansBg variant="dark" />
      <div style={{ maxWidth: "896px", margin: "0 auto" }}>
        <p className="eyebrow text-[var(--red)]" style={{ textAlign: "center", marginBottom: "12px" }}>Find Us</p>
        <h2 className="font-serif text-white" style={{ fontSize: "2rem", textAlign: "center", marginBottom: "32px" }}>
          Come Visit
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {/* Address — spans 2 cols so Contact aligns with footer's Company column */}
          <div style={{ gridColumn: "1 / 3" }}>
            <h3 className="eyebrow text-[var(--brown-light)]" style={{ marginBottom: "16px" }}>Location</h3>
            <p className="text-white font-serif text-base mb-1">Cafe de la Republica</p>
            <p className="text-[var(--brown-light)] text-[13px] leading-relaxed">
              {address.split("\n").reduce<React.ReactNode[]>((acc, line, i, arr) => {
                acc.push(line);
                if (i < arr.length - 1) acc.push(<br key={i} />);
                return acc;
              }, [])}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="eyebrow text-[var(--brown-light)]" style={{ marginBottom: "16px" }}>Hours</h3>
            <dl style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { day: "Mon – Fri", hours: hoursMF  },
                { day: "Saturday",  hours: hoursSat },
                { day: "Sunday",    hours: hoursSun },
              ].map(({ day, hours }) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <dt className="text-[var(--brown-light)]">{day}</dt>
                  <dd className="text-white">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-[var(--brown-light)]" style={{ marginBottom: "16px" }}>Contact</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-[var(--brown-light)] hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-[var(--brown-light)] hover:text-white transition-colors"
                >
                  {email}
                </a>
              </li>
              {instagramUrl && (
                <li>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--brown-light)] hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
