"use client";
import type { Track } from "../domain/types";
import TrackItem from "./TrackItem";

type Props = {
  tracks: Track[];
  playlistIds: Set<string>;
  selectedIds: Set<string>;
  onAdd: (t: Track) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export default function TrackList({ tracks, playlistIds, selectedIds, onAdd, onRemove, onToggleSelect }: Props) {
  return (
    <ul className="divide-y divide-gray-200">
      {tracks.map(t => (
        <li key={t.id}>
          <TrackItem
            track={t}
            inList={playlistIds.has(t.id)}
            selected={selectedIds.has(t.id)}
            onAdd={onAdd}
            onRemove={onRemove}
            onToggleSelect={onToggleSelect}
          />
        </li>
      ))}
    </ul>
  );
}
