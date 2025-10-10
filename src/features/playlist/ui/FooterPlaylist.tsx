"use client";
import Link from "next/link";
import { GlassButton } from "@/src/components/ui/GlassButton";
import { usePlaylistController } from "../app/usePlaylistController";
import TrackItem from "./TrackItem";

export default function FooterPlaylist() {
  const { playlist, expanded, toggleExpand, add, remove, toggleSelect, selectedIds } =
    usePlaylistController();

  const hasTracks = playlist && playlist.length > 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      {/* expanding drawer */}
      <div
        className={`absolute bottom-[64px] w-full md:max-w-[600px] transition-all duration-400 ease-in-out pointer-events-auto ${
          expanded && hasTracks
            ? "max-h-[55vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-4"
        }`}
      >
        <div
          className="mx-auto bg-gradient-to-br from-[#150c1f]/70 to-[#0b0610]/70 
                     backdrop-blur-xl border border-white/10
                     rounded-t-2xl shadow-[0_0_30px_rgba(140,70,255,0.15)] 
                     overflow-hidden w-full"
        >
          <div className="max-h-[55vh] overflow-y-auto">
            {hasTracks ? (
              <div className="divide-y divide-white/5">
                {playlist.map((track: any) => (
                  <div key={track.id} className="scale-[0.92]">
                    <TrackItem
                      track={track}
                      inList={true}
                      selected={selectedIds.has(track.id)}
                      onAdd={add}
                      onRemove={remove}
                      onToggleSelect={toggleSelect}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-white/40 select-none">
                🎧 Add some tracks to start your playlist
              </div>
            )}
          </div>
        </div>
      </div>

      {/* footer bar */}
      <div
        className="relative w-full md:max-w-[600px] 
                   bg-white/[0.03] backdrop-blur-xl border-t border-white/10 
                   rounded-t-2xl text-white px-4 py-3 flex items-center justify-between
                   shadow-[0_0_25px_rgba(140,70,255,0.15)] pointer-events-auto"
      >
        <span className="text-sm text-white/70">
          {hasTracks
            ? `${playlist.length} track${playlist.length !== 1 ? "s" : ""} in playlist`
            : "No tracks yet"}
        </span>

        <div className="flex items-center gap-3">
          {hasTracks && (
            <Link
              href="/generate"
              className="px-4 py-2 rounded-full text-sm text-white 
                         bg-purple-600/30 border border-purple-400/40
                         hover:bg-purple-600/50 hover:shadow-[0_0_12px_rgba(140,70,255,0.4)]
                         transition-all"
            >
              Generate
            </Link>
          )}

          <button
            onClick={hasTracks ? toggleExpand : undefined}
            disabled={!hasTracks}
            className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
              hasTracks
                ? "bg-white/[0.06] border-white/10 text-white hover:bg-white/[0.15] hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                : "bg-white/[0.02] border-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            {expanded ? "Close" : "Open"} Playlist
          </button>
        </div>
      </div>
    </footer>
  );
}
