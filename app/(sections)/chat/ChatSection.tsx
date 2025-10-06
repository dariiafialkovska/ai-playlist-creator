"use client";
import { useEffect, useMemo, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import type { Message } from "@/src/types/message";
import type { ChatContent } from "@/src/types/ui";

type Props = { content: ChatContent };

export default function ChatSection({ content }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");

  // seed first bot message once
  useEffect(() => {
    setMessages((prev) =>
      prev.length
        ? prev
        : [
            {
              id: crypto.randomUUID(),
              role: "bot",
              text: content.initialMessage,
              at: Date.now(),
            },
          ],
    );
  }, [content.initialMessage]);

  const onSend = () => {
    const text = draft.trim();
    if (!text) return;
    const msg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      at: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    setDraft("");
    // no backend call here; next step will handle AI/Spotify
  };

  const placeholder = useMemo(
    () => content.placeholder || "type your vibe…",
    [content.placeholder],
  );

  return (
    <section className="min-h-[88vh] bg-[#f7f7f9] px-4 py-16">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur border border-black/5 shadow-lg p-6">
        <div className="mb-4 text-sm text-gray-500">🎧 Chat Mode</div>

        <div className="space-y-3 mb-6 max-h-[48vh] overflow-y-auto pr-1">
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role}>
              {m.text}
            </ChatBubble>
          ))}
        </div>

        <ChatInput
          value={draft}
          placeholder={placeholder}
          sendLabel={content.sendLabel}
          onChange={setDraft}
          onSend={onSend}
        />
      </div>
    </section>
  );
}
