"use client";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "icon";
  variant?: "default" | "outline";
}

export function Button({ size = "default", variant = "default", className = "", disabled, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full transition-colors font-sans cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const sizeClass = size === "icon" ? "w-9 h-9" : "px-4 py-2 text-sm";
  const variantClass = variant === "outline"
    ? "border border-[var(--tan)] text-[var(--brown)] hover:bg-[var(--tan)]/20 bg-transparent"
    : "bg-[var(--red)] text-white hover:opacity-90";

  return (
    <button className={`${base} ${sizeClass} ${variantClass} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
