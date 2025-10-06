"use client";
import { useEffect, useMemo, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ResultPanel from "./ResultPanel";
import type { Message } from "@/src/types/message";
import type { ChatContent } from "@/src/types/ui";
import { generatePlaylist } from "@/src/features/playlist/lib/generatePlaylist";
import { usePlaylistController } from "@/src/features/playlist/app/usePlaylistController";
import type { PlaylistResult } from "@/src/features/playlist/types";
type Props = { content: ChatContent };

export default function ChatSection({ content }: Props) {
  // ⬇️ HOOK MUST BE INSIDE FUNCTION
const { state, add, remove, toggleSelect, getSelectedIds, ready } = usePlaylistController();

  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlaylistResult | null>(null);

  // show initial message once
  useEffect(() => {
    if (content?.initialMessage && messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: content.initialMessage,
          at: Date.now(),
        },
      ]);
    }
  }, [content.initialMessage, messages.length]);

  const onSend = async () => {
    const text = draft.trim();
    if (!text) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text, at: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");

    setLoading(true);
    try {
      const generated = await generatePlaylist(text);
      setResult(generated);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: `ok wait— ${generated.title} coming up.`,
          at: Date.now(),
        },
      ]);
    } catch (err) {
      console.error("playlist gen error", err);
    } finally {
      setLoading(false);
    }
  };

  const placeholder = useMemo(() => content.placeholder || "type your vibe…", [content.placeholder]);

  // Wait until playlist controller ready
  if (!ready)
    return (
      <section className="min-h-[60vh] flex items-center justify-center text-gray-500">
        loading player…
      </section>
    );

  return (
    <section className="min-h-[88vh] px-4 py-12">
      <div className="mx-auto grid w-full max-w-5xl md:grid-cols-[1fr_320px] gap-6">
        {/* chat card */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-black/5 shadow-lg p-6">
          <div className="mb-4 text-sm text-gray-500">🎧 Chat Mode</div>
          <div className="space-y-3 mb-6 max-h-[48vh] overflow-y-auto pr-1">
            {messages.map((m) => (
              <ChatBubble key={m.id} role={m.role}>
                {m.text}
              </ChatBubble>
            ))}
            {loading && (
              <ChatBubble role="bot">
                <span className="inline-flex items-center gap-2">
                  cooking your mix
                  <span className="inline-block h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="inline-block h-2 w-2 bg-gray-300 rounded-full animate-bounce [animation-delay:120ms]" />
                  <span className="inline-block h-2 w-2 bg-gray-200 rounded-full animate-bounce [animation-delay:240ms]" />
                </span>
              </ChatBubble>
            )}
          </div>
          <ChatInput
            value={draft}
            placeholder={placeholder}
            sendLabel={content.sendLabel}
            onChange={setDraft}
            onSend={onSend}
          />
        </div>

        {/* playlist result */}
        <ResultPanel
          result={result}
          loading={loading}
          playlistIds={new Set(state.playlist.map((t) => t.id))}
          selectedIds={state.selectedIds as Set<string>} // temporary cast
          onAdd={add}
          onRemove={remove}
          onToggleSelect={toggleSelect}
        />
      </div>
    </section>
  );
}
