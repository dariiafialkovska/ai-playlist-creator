"use client";
import { useState } from "react";
import type { Track } from "../domain/types";
import { Plus, Minus } from "lucide-react"; // install: npm i lucide-react

type Props = {
  track: Track;
  inList: boolean;
  selected: boolean;
  onAdd: (t: Track) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export default function TrackItem({ track, inList, selected, onAdd, onRemove, onToggleSelect }: Props) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(track.id), 180); // small delay so animation finishes
  };

  return (
    <div
      className={`flex items-center gap-3 py-3 px-2 transition-all duration-200 ${
        removing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
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
      >
        {selected ? "Selected" : "Select"}
      </button>
{inList ? (
  <button
    onClick={handleRemove}
    className="p-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition"
    aria-label="Remove"
  >
    <Minus size={16} />
  </button>
) : (
  <button
    onClick={() => onAdd(track)}
    className="p-2 rounded-full border border-gray-300 hover:border-gray-500 transition"
    aria-label="Add"
  >
    <Plus size={16} />
  </button>
)}
     
    </div>
  );
}
