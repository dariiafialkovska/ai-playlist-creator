"use client";
import { Plus, Minus, CheckCircle2 } from "lucide-react";
import type { Track } from "../domain/types";

type Props = {
  track: Track;
  inList: boolean;
  selected: boolean;
  selectMode?: boolean;
  onAdd: (t: Track) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export default function TrackItem({
  track,
  inList,
  selected,
  selectMode = false,
  onAdd,
  onRemove,
  onToggleSelect,
}: Props) {
  return (
    <div
      onClick={() => selectMode && onToggleSelect(track.id)}
      className={`flex items-center gap-3 py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer relative
        ${selected ? "bg-emerald-50 ring-2 ring-emerald-400/60" : "hover:bg-gray-50"}
      `}
    >
      {selectMode && (
        <CheckCircle2
          className={`absolute left-1 top-1 ${
            selected ? "text-emerald-500" : "text-gray-300"
          }`}
          size={18}
        />
      )}

      <img
        src={track.cover}
        alt={track.title}
        className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex flex-col overflow-hidden flex-1">
        <span className="font-medium text-sm truncate">{track.title}</span>
        <span className="text-xs text-gray-500 truncate">{track.artist}</span>
      </div>

      {!selectMode && (
        <>
          {inList ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(track.id);
              }}
              className="p-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition"
            >
              <Minus size={16} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(track);
              }}
              className="p-2 rounded-full border border-gray-300 hover:border-gray-500 transition"
            >
              <Plus size={16} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
