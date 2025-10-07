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
  onAddToChat: (tracks: any[]) => void; // new
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

  if (loading)
    return (
      <aside className="p-4">
        <div className="h-24 animate-pulse" />
      </aside>
    );

  if (!hasTracks)
    return (
      <aside className="p-4 text-gray-500 flex flex-col items-center justify-center py-16">
        <p className="text-sm mb-3">oh.. nothing here yet</p>
      </aside>
    );

  return (
    <aside
      className="
    relative rounded-3xl
    md:sticky md:top-8 md:self-start
    bg-white/90 backdrop-blur border-t md:border md:rounded-2xl
    p-4 shadow-lg max-h-[80vh] overflow-y-auto
  "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-semibold">{result.title}</h3>
          <p className="text-sm text-gray-500">{result.caption}</p>
        </div>
        <button
          onClick={handleToggleMode}
          className={`p-2 rounded-full border transition ${selectMode
              ? "bg-red-100 text-red-600 border-red-300 hover:bg-red-200"
              : "bg-white border-gray-300 hover:border-gray-500"
            }`}
        >
          {selectMode ? <X size={16} /> : "Select"}
        </button>
      </div>

      {/* Action Bar */}
      {selectMode && (
        <div className="flex items-center justify-end gap-2 mb-3">
          <button
            onClick={handleBulkAdd}
            className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition"
            aria-label="Add selected to playlist"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={handleBulkRemove}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            aria-label="Remove selected"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={handleAddToChat}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
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
