"use client";

import React, { createContext, useContext, useState } from "react";
import type { Lang, LangField } from "../lib/i18n";

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (field: LangField) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ca");

  const toggleLang = () => setLang((prev) => (prev === "ca" ? "en" : "ca"));

  const t = (field: LangField): string => field[lang];

  return React.createElement(
    LangContext.Provider,
    { value: { lang, toggleLang, t } },
    children
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}
