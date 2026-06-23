"use client";
import { useState } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import {
  FREQUENCIES, SIZES, CHOICES, getPrice,
  type Frequency, type Size, type Choice,
} from "@/lib/subscriptionPricing";

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
    <div style={{ marginBottom: "24px" }}>
      <p aria-hidden="true" className="eyebrow text-[var(--brown-light)]" style={{ marginBottom: "12px" }}>{label}</p>
      <div role="radiogroup" aria-label={label} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            role="radio"
            aria-checked={value === opt}
            className="font-sans text-[10px] tracking-widest uppercase rounded-full transition-all"
            style={{
              paddingTop: "10px", paddingBottom: "10px", paddingLeft: "24px", paddingRight: "24px",
              background: value === opt ? "var(--red)"  : "transparent",
              color:      value === opt ? "white"       : "var(--brown)",
              border:     `1px solid ${value === opt ? "var(--red)" : "rgba(200,169,138,0.4)"}`,
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SubscribePage() {
  const [freq,   setFreq]   = useState<Frequency>("Monthly");
  const [size,   setSize]   = useState<Size>("250g");
  const [choice, setChoice] = useState<Choice>("You Pick");

  const price = getPrice(size, freq);

  return (
    <>
      <div className="relative">
        <Nav />
      </div>
      <main>
        <div style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "112px", paddingBottom: "32px", background: "#1a0a04" }}>
          <div style={{ maxWidth: "672px", margin: "0 auto" }}>
            <p aria-hidden="true" className="eyebrow text-[var(--red)]" style={{ marginBottom: "12px" }}>Subscribe &amp; Save</p>
            <h1 className="font-serif text-white" style={{ fontSize: "2.5rem" }}>
              Fresh Coffee. Your Schedule.
            </h1>
          </div>
        </div>
        <div style={{ paddingLeft: "40px", paddingRight: "40px", paddingTop: "64px", paddingBottom: "64px", background: "var(--cream)" }}>
          <div style={{ maxWidth: "672px", margin: "0 auto" }}>
            <PillGroup label="Frequency" options={FREQUENCIES} value={freq}   onChange={setFreq}   />
            <PillGroup label="Size"      options={SIZES}       value={size}   onChange={setSize}   />
            <PillGroup label="Choice"    options={CHOICES}     value={choice} onChange={setChoice} />

            <div
              className="rounded-xl"
              style={{ marginTop: "32px", padding: "24px", background: "var(--cream-warm)", border: "1px solid rgba(200,169,138,0.3)" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "8px" }}>
                <p className="font-serif text-[var(--brown)] text-lg">
                  {size} · {freq}
                </p>
                <p
                  aria-label={`Price: €${price.toFixed(2)} per delivery`}
                  className="font-serif text-[var(--brown)]"
                  style={{ fontSize: "1.8rem" }}
                >
                  €{price.toFixed(2)}
                </p>
              </div>
              <p className="text-[var(--brown-light)] text-[13px]" style={{ marginBottom: "20px" }}>
                {choice === "Curated"
                  ? "We select the best seasonal single origins for you."
                  : "Choose your coffee from our full selection."}
              </p>
              <button
                aria-label={`Subscribe for €${price.toFixed(2)} per delivery`}
                className="font-sans text-[10px] tracking-widest uppercase rounded-full text-white transition-opacity hover:opacity-85"
                style={{ width: "100%", paddingTop: "16px", paddingBottom: "16px", background: "var(--red)" }}
              >
                Subscribe — €{price.toFixed(2)} / delivery
              </button>
            </div>

            <p className="text-[var(--brown-light)] text-[12px]" style={{ textAlign: "center", marginTop: "16px" }}>
              Cancel or pause anytime. Free shipping to Andorra and Spain.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
