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
    <div className="mb-6">
      <p aria-hidden="true" className="eyebrow text-[var(--brown-light)] mb-3">{label}</p>
      <div role="radiogroup" aria-label={label} className="flex gap-3 flex-wrap">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            role="radio"
            aria-checked={value === opt}
            className="font-sans text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all"
            style={{
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
        <div className="px-10 pt-12 pb-8" style={{ background: "#1a0a04" }}>
          <div className="max-w-2xl mx-auto">
            <p aria-hidden="true" className="eyebrow text-[var(--red)] mb-3">Subscribe &amp; Save</p>
            <h1 className="font-serif text-white" style={{ fontSize: "2.5rem" }}>
              Fresh Coffee. Your Schedule.
            </h1>
          </div>
        </div>
        <div className="px-10 py-16" style={{ background: "var(--cream)" }}>
          <div className="max-w-2xl mx-auto">
            <PillGroup label="Frequency" options={FREQUENCIES} value={freq}   onChange={setFreq}   />
            <PillGroup label="Size"      options={SIZES}       value={size}   onChange={setSize}   />
            <PillGroup label="Choice"    options={CHOICES}     value={choice} onChange={setChoice} />

            <div
              className="mt-8 p-6 rounded-xl"
              style={{ background: "var(--cream-warm)", border: "1px solid rgba(200,169,138,0.3)" }}
            >
              <div className="flex items-baseline justify-between mb-2">
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
              <p className="text-[var(--brown-light)] text-[13px] mb-5">
                {choice === "Curated"
                  ? "We select the best seasonal single origins for you."
                  : "Choose your coffee from our full selection."}
              </p>
              <button
                aria-label={`Subscribe for €${price.toFixed(2)} per delivery`}
                className="w-full font-sans text-[10px] tracking-widest uppercase py-4 rounded-full text-white transition-opacity hover:opacity-85"
                style={{ background: "var(--red)" }}
              >
                Subscribe — €{price.toFixed(2)} / delivery
              </button>
            </div>

            <p className="text-[var(--brown-light)] text-[12px] text-center mt-4">
              Cancel or pause anytime. Free shipping to Andorra and Spain.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
