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
import TrackAttachment from "./TrackAttachment";
type Props = { content: ChatContent };

export default function ChatSection({ content }: Props) {
  const { playlist, add, remove, toggleSelect, ready } = usePlaylistController();

  // local state for selected IDs (ephemeral, not persisted)
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




  // handle selection
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
      <section className="min-h-[60vh] flex items-center justify-center text-gray-500">
        loading player…
      </section>
    );

  return (
    <section className="min-h-[88vh] px-4 py-12">
      <div className="mx-auto grid w-full max-w-5xl md:grid-cols-[1fr_320px] gap-6">
        {/* Chat area */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-black/5 shadow-lg p-6">
          <div className="mb-4 text-sm text-gray-500">🎧 Chat Mode</div>
          <div className="space-y-3 mb-6 max-h-[48vh] overflow-y-auto pr-1">
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

        {/* Playlist results */}
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
    </section>
  );
}
