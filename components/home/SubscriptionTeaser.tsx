"use client";
import { useState } from "react";
import Link from "next/link";

const FREQUENCIES = ["Weekly", "Bi-weekly", "Monthly"] as const;
const SIZES       = ["250g",   "500g",      "1kg"]     as const;
const CHOICES     = ["You Pick", "Curated"]             as const;

type Frequency = typeof FREQUENCIES[number];
type Size      = typeof SIZES[number];
type Choice    = typeof CHOICES[number];

export default function SubscriptionTeaser() {
  const [freq,   setFreq]   = useState<Frequency>("Monthly");
  const [size,   setSize]   = useState<Size>("250g");
  const [choice, setChoice] = useState<Choice>("You Pick");

  return (
    <section className="w-full py-16 px-10" style={{ background: "#1a0a04" }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="eyebrow text-[var(--red)] mb-3">Subscription</p>
        <h2 className="font-serif text-white mb-3" style={{ fontSize: "2rem" }}>
          Fresh Coffee. Your Schedule.
        </h2>
        <p className="text-[var(--brown-light)] text-sm mb-10 leading-relaxed">
          Choose your frequency, bag size, and whether you want to pick your blend or let us curate.
        </p>

        <div className="flex flex-col gap-5 mb-10">
          {/* Frequency */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {FREQUENCIES.map(f => (
              <button
                key={f}
                onClick={() => setFreq(f)}
                className="font-sans text-[10px] tracking-widest uppercase px-5 py-2 rounded-full transition-all"
                style={{
                  background: freq === f ? "var(--red)"          : "rgba(255,255,255,0.07)",
                  color:      freq === f ? "white"               : "rgba(200,169,138,0.8)",
                  border:     `1px solid ${freq === f ? "var(--red)" : "rgba(200,169,138,0.2)"}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Size */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {SIZES.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="font-sans text-[10px] tracking-widest uppercase px-5 py-2 rounded-full transition-all"
                style={{
                  background: size === s ? "var(--red)"          : "rgba(255,255,255,0.07)",
                  color:      size === s ? "white"               : "rgba(200,169,138,0.8)",
                  border:     `1px solid ${size === s ? "var(--red)" : "rgba(200,169,138,0.2)"}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Choice */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {CHOICES.map(c => (
              <button
                key={c}
                onClick={() => setChoice(c)}
                className="font-sans text-[10px] tracking-widest uppercase px-5 py-2 rounded-full transition-all"
                style={{
                  background: choice === c ? "var(--red)"          : "rgba(255,255,255,0.07)",
                  color:      choice === c ? "white"               : "rgba(200,169,138,0.8)",
                  border:     `1px solid ${choice === c ? "var(--red)" : "rgba(200,169,138,0.2)"}`,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/subscribe"
          className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase px-8 py-3.5 rounded-full text-white transition-opacity hover:opacity-85"
          style={{ background: "var(--red)" }}
        >
          Start Subscription →
        </Link>
      </div>
    </section>
  );
}
