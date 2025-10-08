"use client";
import { usePlaylistController } from "../app/usePlaylistController";
import TrackItem from "./TrackItem";

export default function FooterPlaylist() {
  const { playlist, expanded, toggleExpand, add, remove, toggleSelect, selectedIds } =
    usePlaylistController();

  const hasTracks = playlist && playlist.length > 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      {/* expanding drawer above bar */}
      <div
        className={`absolute bottom-[64px] w-full md:max-w-[600px] transition-all duration-300 pointer-events-auto ${
          expanded ? "max-h-[55vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto bg-black/85 backdrop-blur rounded-t-2xl md:rounded-t-2xl border border-gray-800 overflow-hidden shadow-2xl w-full">
          <div className="max-h-[55vh] overflow-y-auto">
            {hasTracks ? (
              <div className="divide-y divide-white/10">
                {playlist.map((track: any) => (
                  <TrackItem
                    key={track.id}
                    track={track}
                    inList={true}
                    selected={selectedIds.has(track.id)}
                    onAdd={add}
                    onRemove={remove}
                    onToggleSelect={toggleSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-gray-400 select-none">
                🎧 Add some tracks to start your playlist
              </div>
            )}
          </div>
        </div>
      </div>

      {/* footer bar */}
      <div className="relative w-full md:max-w-[600px] bg-black/85 backdrop-blur border-t border-gray-800 rounded-t-2xl text-white px-4 py-3 flex items-center justify-between pointer-events-auto">
        <span className="text-sm opacity-80">
          {playlist.length} track{playlist.length !== 1 ? "s" : ""} in playlist
        </span>

        <button
          onClick={toggleExpand}
          className="px-3 py-1 text-sm border rounded-lg hover:bg-white/10 transition-colors"
        >
          {expanded ? "Close" : "Open"} Playlist
        </button>
      </div>
    </footer>
  );
}
