import Link from "next/link";

export default function PromoStrip() {
  return (
    <div
      className="w-full py-5 px-10 flex items-center justify-center gap-6"
      style={{ background: "var(--red)" }}
    >
      <p className="font-sans text-white text-[11px] tracking-[0.3em] uppercase">
        20% off your first order — use code{" "}
        <span className="font-semibold tracking-[0.4em]">BENVINGUTS</span>
      </p>
      <Link
        href="/shop"
        className="font-sans text-[10px] tracking-widest uppercase px-5 py-2 rounded-full text-[var(--red)] transition-opacity hover:opacity-80"
        style={{ background: "rgba(255,255,255,0.92)" }}
      >
        Shop Now
      </Link>
    </div>
  );
}
