"use client";
import { useState } from "react";
import { Container } from "@/src/components/layout/Container";
import { ChatSection } from "@/app/(sections)/chat";
import { GlassButton } from "@/src/components/ui/GlassButton";
import { usePlaylistController } from "@/src/features/playlist/app/usePlaylistController";

export default function GeneratePage() {
  const { playlist } = usePlaylistController();
  const [stage, setStage] = useState<"chat" | "ad" | "save">("chat");

  const handleGenerate = () => setStage("ad");

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-white pt-24 pb-32">
      <Container>
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-white/90">
            Finalize Your Mix
          </h1>
          <p className="text-white/60 mt-2">
            Chat, preview, and prepare to save your playlist.
          </p>
        </section>

        {/* Chat stage */}
        {stage === "chat" && (
          <div className="mb-20">
            <ChatSection
              content={{
                initialMessage: "Hey! Ready to polish your mix?",
                placeholder: "Describe the final vibe…",
                sendLabel: "Send",
              }}
            />
            <div className="flex justify-center mt-10">
              <GlassButton onClick={handleGenerate}>Generate Playlist</GlassButton>
            </div>
          </div>
        )}

        {/* Ad placeholder */}
        {stage === "ad" && (
          <div className="text-center py-24 text-white/70">
            <p className="mb-4">[Ad placeholder — AdSense will appear here]</p>
            <GlassButton onClick={() => setStage("save")}>Continue</GlassButton>
          </div>
        )}

        {/* Save stage */}
        {stage === "save" && (
          <div className="flex flex-col items-center gap-6 text-center py-20">
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Give your playlist a title…"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:shadow-[0_0_12px_rgba(255,255,255,0.2)]"
              />
            </div>

            <GlassButton onClick={() => alert('Saving soon!')}>
              Save Playlist
            </GlassButton>

            <button
              onClick={() => setStage("chat")}
              className="text-sm text-white/60 hover:text-white transition"
            >
              ← Let’s Talk Again
            </button>

            <div className="text-xs text-white/40 mt-10">
              {playlist.length
                ? `${playlist.length} track${playlist.length !== 1 ? "s" : ""} ready to save`
                : "No tracks in playlist yet"}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
