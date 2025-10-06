"use client";
import type { Track } from "../domain/types";

type Props = {
  track: Track;
  inList: boolean;
  selected: boolean;
  onAdd: (t: Track) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export default function TrackItem({ track, inList, selected, onAdd, onRemove, onToggleSelect }: Props) {
  return (
    <div className="flex items-center gap-3 py-3 px-2">
      <img src={track.cover} alt={track.title} className="h-14 w-14 rounded-lg object-cover" />
      <div className="flex flex-col overflow-hidden flex-1">
        <span className="font-medium text-sm truncate">{track.title}</span>
        <span className="text-xs text-gray-500 truncate">{track.artist}</span>
      </div>

      <button
        onClick={() => onToggleSelect(track.id)}
        className={`text-xs px-3 py-1 rounded-full border transition ${
          selected ? "bg-emerald-500 text-white border-emerald-500" : "bg-white border-gray-300"
        }`}
        aria-pressed={selected}
      >
        {selected ? "Selected" : "Select"}
      </button>

      {inList ? (
        <button onClick={() => onRemove(track.id)} className="text-xs px-3 py-1 rounded-full border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 transition">
          Remove
        </button>
      ) : (
        <button onClick={() => onAdd(track)} className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:border-gray-500 transition">
          Add
        </button>
      )}
    </div>
  );
}
