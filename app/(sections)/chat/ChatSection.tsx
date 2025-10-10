"use client";
import { useEffect, useMemo, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ResultPanel from "./ResultPanel";
import TrackAttachment from "./TrackAttachment";
import type { Message } from "@/src/types/message";
import type { ChatContent } from "@/src/types/ui";
import type { PlaylistResult } from "@/src/features/playlist/types";
import { generatePlaylist } from "@/src/features/playlist/lib/generatePlaylist";
import { usePlaylistController } from "@/src/features/playlist/app/usePlaylistController";
import { Container } from "@/src/components/layout/Container";

type Props = { content: ChatContent };

export default function ChatSection({ content }: Props) {
  const { playlist, add, remove, toggleSelect, ready } = usePlaylistController();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlaylistResult | null>(null);

  // initial bot message
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

  const handleAddToChat = (tracks: any[]) => {
    if (!tracks.length) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        text: "🎵 Added tracks:",
        attachments: tracks,
        at: Date.now(),
      },
    ]);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const handleClearSelect = () => setSelectedIds(new Set());
  const placeholder = useMemo(() => content.placeholder || "type your vibe…", [content.placeholder]);

  if (!ready)
    return (
      <section className="min-h-[60vh] flex items-center justify-center text-white/50 bg-black">
        loading player…
      </section>
    );

  return (
    <section className="relative py-20">
      <Container>
        <div className="mx-auto grid w-full max-w-6xl md:grid-cols-[1fr_340px] gap-10">
          {/* Chat Area */}
          <div
            className="rounded-3xl p-6 bg-white/[0.03] backdrop-blur-xl
                       border border-white/10 shadow-[0_0_40px_rgba(120,70,255,0.15)]"
          >
            <div className="mb-4 text-sm text-white/50 flex items-center gap-2">
              <span>🎧</span> Chat Mode
            </div>

            <div className="space-y-3 mb-6 max-h-[50vh] overflow-y-auto pr-1">
              {messages.map((m) => (
                <div key={m.id}>
                  <ChatBubble role={m.role}>{m.text}</ChatBubble>
                  {m.attachments && m.attachments.length > 0 && (
                    <TrackAttachment tracks={m.attachments} />
                  )}
                </div>
              ))}

              {loading && (
                <ChatBubble role="bot">
                  <span className="inline-flex items-center gap-2 text-white/60">
                    cooking your mix
                    <span className="inline-block h-2 w-2 bg-white/60 rounded-full animate-bounce" />
                    <span className="inline-block h-2 w-2 bg-white/50 rounded-full animate-bounce [animation-delay:120ms]" />
                    <span className="inline-block h-2 w-2 bg-white/40 rounded-full animate-bounce [animation-delay:240ms]" />
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

          {/* Playlist Results */}
          <div
             >
            <ResultPanel
              result={result}
              loading={loading}
              playlistIds={new Set(playlist.map((t) => t.id))}
              selectedIds={selectedIds}
              onAdd={add}
              onRemove={remove}
              onToggleSelect={handleToggleSelect}
              onClearSelect={handleClearSelect}
              onAddToChat={handleAddToChat}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
