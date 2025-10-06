"use client";
import { HeroContent } from "@/src/types/ui";
import { theme } from "@/src/constants/themes";

type Props = {
  content: HeroContent;
  onScrollToChat: () => void;
};

export default function HeroSection({ content, onScrollToChat }: Props) {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center px-6">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0f11] via-[#121416] to-[#171a1d]" />
      <div className="absolute inset-0 -z-10 opacity-20 blur-3xl bg-gradient-to-tr from-fuchsia-400/40 via-emerald-400/30 to-cyan-400/40" />

      {/* content */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className={` text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}>
          {content.title}
        </h1>
        <p className="text-base md:text-lg text-white/80 mb-8">
          {content.description}
        </p>

        <button
          onClick={onScrollToChat}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base text-white transition-all ${theme.glass} hover:border-white/40`}
          aria-label="Scroll to chat"
        >
          {content.ctaText}
        </button>
      </div>
    </section>
  );
}
