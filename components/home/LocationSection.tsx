import React from "react";
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
    <section id="location" className="px-10 py-16" style={{ background: "#1a0a04" }}>
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow text-[var(--red)] text-center mb-3">Find Us</p>
        <h2 className="font-serif text-white text-center mb-12" style={{ fontSize: "2rem" }}>
          Come Visit
        </h2>

        <div className="grid grid-cols-3 gap-10">
          {/* Address */}
          <div>
            <h3 className="eyebrow text-[var(--brown-light)] mb-4">Location</h3>
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
            <h3 className="eyebrow text-[var(--brown-light)] mb-4">Hours</h3>
            <dl className="space-y-1">
              {[
                { day: "Mon – Fri", hours: hoursMF  },
                { day: "Saturday",  hours: hoursSat },
                { day: "Sunday",    hours: hoursSun },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-[13px]">
                  <dt className="text-[var(--brown-light)]">{day}</dt>
                  <dd className="text-white">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-[var(--brown-light)] mb-4">Contact</h3>
            <ul className="space-y-2 text-[13px]">
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
