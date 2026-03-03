"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "red" | "green" | "ghost" | "outline-red" | "outline-green";
type Size = "lg" | "md" | "sm" | "xs";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  red: "bg-cs-red text-white animate-pulseRed hover:bg-[#FF5248]",
  green: "bg-cs-green text-black shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:bg-[#2FFFAA]",
  ghost: "bg-transparent text-cs-text-muted border border-cs-border hover:border-cs-muted hover:text-cs-text",
  "outline-red": "bg-transparent text-cs-red border-2 border-cs-red hover:bg-[rgba(255,59,48,0.1)]",
  "outline-green": "bg-transparent text-cs-green border-2 border-cs-green hover:bg-[rgba(0,255,135,0.08)]",
};

const sizeClasses: Record<Size, string> = {
  lg: "text-[28px] px-9 py-[18px]",
  md: "text-[22px] px-7 py-[14px]",
  sm: "text-[15px] px-[18px] py-[9px]",
  xs: "font-mono text-[12px] px-3 py-[6px] tracking-wide",
};

export default function Button({
  variant = "ghost",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 border-none rounded-[4px]",
        "font-display tracking-[2px] cursor-pointer transition-all duration-150",
        "relative overflow-hidden uppercase active:scale-[0.97]",
        "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
