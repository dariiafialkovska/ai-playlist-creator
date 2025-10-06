"use client";
import { TrackList } from "@/src/features/playlist/ui";
import type { PlaylistResult } from "@/src/features/playlist/types";
type Props = {
  result: PlaylistResult | null;
  loading: boolean;
  playlistIds: Set<string>;
  selectedIds: Set<string>;
  onAdd: (t: any) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export default function ResultPanel({ result, loading, playlistIds, selectedIds, onAdd, onRemove, onToggleSelect }: Props) {
  return (
    <aside className="md:sticky md:top-8 md:self-start fixed bottom-0 left-0 right-0 md:relative bg-white/90 backdrop-blur border-t md:border md:rounded-2xl p-4 shadow-lg max-h-[80vh] overflow-y-auto">
      {loading ? /* skeleton */ <div className="h-24 animate-pulse" /> :
        result ? (
          <div>
            <h3 className="text-lg font-semibold">{result.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{result.caption}</p>
            <TrackList
              tracks={result.tracks}
              playlistIds={playlistIds}
              selectedIds={selectedIds}
              onAdd={onAdd}
              onRemove={onRemove}
              onToggleSelect={onToggleSelect}
            />
          </div>
        ) : <div className="text-sm text-gray-500">no tracks yet. type a vibe in chat.</div>}
    </aside>
  );
}
