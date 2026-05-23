import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/hooks/useLang";

export const metadata: Metadata = {
  title: "Cafe de la Republica — Specialty Coffee · Andorra",
  description: "Specialty coffee roasted with soul. Shop single-origin coffees and subscribe for fresh delivery from the heart of Andorra.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
