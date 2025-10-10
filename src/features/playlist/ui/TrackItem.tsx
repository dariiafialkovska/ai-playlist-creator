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
        ${
          selected
            ? "bg-purple-600/20 ring-1 ring-purple-400/40"
            : "hover:bg-white/[0.05] hover:backdrop-blur-sm"
        }`}
    >
      {selectMode && (
        <CheckCircle2
          className={`absolute left-1 top-1 ${
            selected ? "text-purple-400" : "text-white/20"
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
        <span className="font-medium text-sm text-white truncate">
          {track.title}
        </span>
        <span className="text-xs text-white/50 truncate">{track.artist}</span>
      </div>

      {!selectMode && (
        <>
          {inList ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(track.id);
              }}
              className="p-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/20 transition"
            >
              <Minus size={16} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(track);
              }}
              className="p-2 rounded-full border border-white/10 text-white/80 hover:border-purple-400 hover:bg-white/[0.07] transition"
            >
              <Plus size={16} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
