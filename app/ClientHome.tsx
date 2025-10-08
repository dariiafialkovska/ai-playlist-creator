// app/ClientHome.tsx
"use client";

import { useRef } from "react";
import { HeroSection } from "./(sections)/hero";
import { ChatSection } from "./(sections)/chat";
import { ExampleSection } from "./(sections)/examples/ExampleSection";

export default function ClientHome({ toneData }: { toneData: any }) {
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollToChat = () => chatRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <HeroSection content={toneData.hero} onScrollToChat={scrollToChat} />        <ExampleSection examples={toneData.examples} />

      <div ref={chatRef}>
        <ChatSection content={toneData.chat} />
      </div>
    </main>
  );
}
