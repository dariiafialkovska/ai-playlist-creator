"use client";
import { HeroContent } from "@/src/types/ui";
import { theme } from "@/src/constants/themes";
import { GlassButton } from "@/src/components/ui/GlassButton";
type Props = {
  content: HeroContent;
  onScrollToChat: () => void;
};

export default function HeroSection({ content, onScrollToChat }: Props) {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center px-6">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-[#120d16]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#a74aff_0%,transparent_40%),radial-gradient(circle_at_80%_70%,#ff7b5f_0%,transparent_45%)] blur-3xl opacity-80" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          backgroundRepeat: "repeat",
        }} />
      {/* content */}
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className={` text-xl md:text-6xl font-base tracking-tight mb-4 bg-clip-text text-white bg-gradient-to-r ${theme.gradient}`}>
          {content.title}
        </h1>
        <p className="text-base md:text-lg text-white/80 mb-8">
          {content.description}
        </p>

        <GlassButton onClick={onScrollToChat} ariaLabel="Scroll to chat">
  {content.ctaText}
</GlassButton>
      </div>
    </section>
  );
}
