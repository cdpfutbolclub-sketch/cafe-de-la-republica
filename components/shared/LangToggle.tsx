"use client";
import { useLang } from "@/hooks/useLang";

export default function LangToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <button
      onClick={toggleLang}
      aria-label={lang === "ca" ? "en" : "ca"}
      className="text-white/80 hover:text-white text-[10px] tracking-[0.3em] uppercase font-sans transition-colors"
    >
      {lang === "ca" ? "CA" : "EN"}
    </button>
  );
}
