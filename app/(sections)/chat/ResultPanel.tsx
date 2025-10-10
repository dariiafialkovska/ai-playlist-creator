"use client";
import { useState } from "react";
import { TrackList } from "@/src/features/playlist/ui";
import type { PlaylistResult } from "@/src/features/playlist/types";
import { X, Plus, Trash2, MessageSquare } from "lucide-react";

type Props = {
  result: PlaylistResult | null;
  loading: boolean;
  playlistIds: Set<string>;
  selectedIds: Set<string>;
  onAdd: (t: any) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onClearSelect: () => void;
  onAddToChat: (tracks: any[]) => void;
};

export default function ResultPanel({
  result,
  loading,
  playlistIds,
  selectedIds,
  onAdd,
  onRemove,
  onToggleSelect,
  onClearSelect,
  onAddToChat,
}: Props) {
  const [selectMode, setSelectMode] = useState(false);
  const hasTracks = result && result.tracks && result.tracks.length > 0;

  const handleToggleMode = () => {
    if (selectMode) onClearSelect();
    setSelectMode((v) => !v);
  };

  const selectedTracks = result
    ? result.tracks.filter((t) => selectedIds.has(t.id))
    : [];

  const handleBulkAdd = () => {
    selectedTracks.forEach((t) => onAdd(t));
    onClearSelect();
    setSelectMode(false);
  };

  const handleBulkRemove = () => {
    selectedTracks.forEach((t) => onRemove(t.id));
    onClearSelect();
    setSelectMode(false);
  };

  const handleAddToChat = () => {
    if (!selectedTracks.length) return;
    onAddToChat(selectedTracks);
    onClearSelect();
    setSelectMode(false);
  };

  // skeleton
  if (loading)
    return (
      <aside className="p-4">
        <div className="h-24 animate-pulse bg-white/[0.05] rounded-xl" />
      </aside>
    );

  // empty state
  if (!hasTracks)
    return (
      <aside className="p-4 text-white/40 flex flex-col items-center justify-center py-16 bg-black/20 rounded-3xl border border-white/10 backdrop-blur-md">
        <p className="text-sm mb-3">oh.. nothing here yet</p>
      </aside>
    );

  return (
    <aside
      className="relative rounded-3xl p-5
                 bg-gradient-to-br from-[#150c1f]/70 to-[#0b0610]/70
                 backdrop-blur-xl border border-white/10
                 shadow-[0_0_35px_rgba(140,70,255,0.15)]
                 text-white max-h-[80vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{result.title}</h3>
          <p className="text-sm text-white/50">{result.caption}</p>
        </div>

        <button
          onClick={handleToggleMode}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
            ${
              selectMode
                ? "border-purple-500/50 bg-purple-600/20 text-purple-300 hover:bg-purple-600/30"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
            }`}
        >
          {selectMode ? <X size={14} /> : "Select"}
        </button>
      </div>

      {/* Action Bar */}
      {selectMode && (
        <div className="flex items-center justify-end gap-2 mb-3">
          <button
            onClick={handleBulkAdd}
            className="p-2 rounded-full bg-purple-600/30 border border-purple-500/40 text-white hover:bg-purple-600/50 transition"
            aria-label="Add selected to playlist"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={handleBulkRemove}
            className="p-2 rounded-full bg-red-600/30 border border-red-500/40 text-white hover:bg-red-600/50 transition"
            aria-label="Remove selected"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={handleAddToChat}
            className="p-2 rounded-full bg-blue-600/30 border border-blue-500/40 text-white hover:bg-blue-600/50 transition"
            aria-label="Send selected to chat"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      )}

      <TrackList
        tracks={result.tracks}
        playlistIds={playlistIds}
        selectedIds={selectedIds}
        selectMode={selectMode}
        onAdd={onAdd}
        onRemove={onRemove}
        onToggleSelect={onToggleSelect}
      />
    </aside>
  );
}
