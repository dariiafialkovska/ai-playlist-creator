"use client";
import { ReactNode } from "react";
import { theme } from "@/src/constants/themes";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

export function GlassButton({
  children,
  onClick,
  className = "",
  ariaLabel,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 
                  rounded-full text-sm md:text-base text-white font-medium 
                  transition-all duration-300 cursor-pointer
                  ${theme.glass} border border-white/20
                  hover:border-white/40 hover:shadow-[0_0_12px_rgba(255,255,150,0.45)]
                  focus:outline-none active:scale-[0.98]
                  ${className}`}
    >
      {children}
    </button>
  );
}
