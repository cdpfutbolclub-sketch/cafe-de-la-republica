"use client";
import { useState } from "react";
import Link from "next/link";
import CoffeeBeansBg from "@/components/shared/CoffeeBeansBg";

const FREQUENCIES = ["Weekly", "Bi-weekly", "Monthly"] as const;
const SIZES       = ["250g",   "500g",      "1kg"]     as const;
const CHOICES     = ["You Pick", "Curated"]             as const;

type Frequency = typeof FREQUENCIES[number];
type Size      = typeof SIZES[number];
type Choice    = typeof CHOICES[number];

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          role="radio"
          aria-checked={value === opt}
          className="font-sans text-[10px] tracking-widest uppercase rounded-full transition-all"
          style={{
            paddingTop: "10px", paddingBottom: "10px", paddingLeft: "22px", paddingRight: "22px",
            background: value === opt ? "var(--red)"        : "rgba(255,255,255,0.07)",
            color:      value === opt ? "white"             : "rgba(200,169,138,0.8)",
            border:     `1px solid ${value === opt ? "var(--red)" : "rgba(200,169,138,0.2)"}`,
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function SubscriptionTeaser() {
  const [freq,   setFreq]   = useState<Frequency>("Monthly");
  const [size,   setSize]   = useState<Size>("250g");
  const [choice, setChoice] = useState<Choice>("You Pick");

  return (
    <section style={{ background: "#1a0a04", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "40px", paddingRight: "40px", position: "relative" }}>
      <CoffeeBeansBg variant="dark" />
      <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>

        <p className="eyebrow text-[var(--red)]" style={{ marginBottom: "12px" }}>Subscription</p>
        <h2 className="font-serif text-white" style={{ fontSize: "2rem", marginBottom: "12px" }}>
          Fresh Coffee. Your Schedule.
        </h2>
        <p className="font-sans text-[var(--brown-light)] text-sm leading-relaxed" style={{ marginBottom: "48px" }}>
          Choose your frequency, bag size, and whether you want to pick your blend or let us curate.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          <PillGroup label="Frequency" options={FREQUENCIES} value={freq}   onChange={setFreq}   />
          <PillGroup label="Size"      options={SIZES}       value={size}   onChange={setSize}   />
          <PillGroup label="Choice"    options={CHOICES}     value={choice} onChange={setChoice} />
        </div>

        <Link
          href="/subscribe"
          className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase rounded-full text-white transition-opacity hover:opacity-85"
          style={{ paddingTop: "14px", paddingBottom: "14px", paddingLeft: "36px", paddingRight: "36px", background: "var(--red)" }}
        >
          Start Subscription →
        </Link>

      </div>
    </section>
  );
}
