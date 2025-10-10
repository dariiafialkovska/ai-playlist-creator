// app/ClientHome.tsx
"use client";

import { useRef } from "react";
import { HeroSection } from "./(sections)/hero";
import { ChatSection } from "./(sections)/chat";
import { ExampleSection } from "./(sections)/examples/ExampleSection";
import { MoodFeatureSection } from "./(sections)/mood/MoodFeatureSection";
import { OccasionShowcase } from "./(sections)/occasion/OccasionShowcase";
export default function ClientHome({ toneData }: { toneData: any }) {
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollToChat = () => chatRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <HeroSection content={toneData.hero} onScrollToChat={scrollToChat} />        <ExampleSection examples={toneData.examples} />
      <MoodFeatureSection />
      <OccasionShowcase
        title="Playlists for Every Mood"
        subtitle="From sunrise drives to midnight coding sessions."
        images={["/images/example1.png", "/images/example2.png", "/images/example3.png"]}
      />
      <OccasionShowcase
        title="Turn Moments into Music"
        subtitle="Because every memory deserves a soundtrack."
        images={["/images/example4.png", "/images/example5.png", "/images/example6.png"]}
        align="right"
      />

      <div ref={chatRef}>
        <ChatSection content={toneData.chat} />
      </div>
    </main>
  );
}
