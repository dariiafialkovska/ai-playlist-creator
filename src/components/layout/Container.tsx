// src/components/layout/Container.tsx
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
