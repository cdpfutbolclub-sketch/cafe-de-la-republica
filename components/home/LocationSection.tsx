export default function LocationSection() {
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
              Carrer de la Unió, 7<br />
              AD500 Andorra la Vella<br />
              Andorra
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="eyebrow text-[var(--brown-light)] mb-4">Hours</h3>
            <dl className="space-y-1">
              {[
                { day: "Mon – Fri", hours: "7:00 – 19:00" },
                { day: "Saturday",  hours: "8:00 – 20:00" },
                { day: "Sunday",    hours: "9:00 – 17:00" },
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
                  href="tel:+376000000"
                  className="text-[var(--brown-light)] hover:text-white transition-colors"
                >
                  +376 000 000
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@caferepublica.ad"
                  className="text-[var(--brown-light)] hover:text-white transition-colors"
                >
                  hello@caferepublica.ad
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/caferepublica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brown-light)] hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
