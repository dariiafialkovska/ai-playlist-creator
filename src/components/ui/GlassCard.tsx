import { ReactNode } from "react";
import { theme } from "@/src/constants/themes"; // assuming same source as your button

type Props = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-3xl p-6 text-white transition-all
                  ${theme.glass} hover:border-white/30 ${className}`}
    >
      {children}
    </div>
  );
}
