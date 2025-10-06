"use client";
import { HeroContent } from "@/types/ui";

interface Props {
  content: HeroContent;
  onScrollToChat: () => void;
}

export default function HeroSection({ content, onScrollToChat }: Props) {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white">
      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        {content.title}
      </h1>
      <p className="text-lg text-gray-300 max-w-xl mb-8">{content.description}</p>
      <button
        onClick={onScrollToChat}
        className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-all"
      >
        {content.ctaText}
      </button>
    </section>
  );
}
