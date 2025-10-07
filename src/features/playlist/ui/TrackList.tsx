"use client";
import type { Track } from "../domain/types";
import TrackItem from "./TrackItem";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  tracks: Track[];
  playlistIds: Set<string>;
  selectedIds: Set<string>;
  onAdd: (t: Track) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export default function TrackList({ tracks, playlistIds, selectedIds, onAdd, onRemove, onToggleSelect }: Props) {
const ordered = [...tracks].sort((a, b) => {
  const aIn = playlistIds.has(a.id);
  const bIn = playlistIds.has(b.id);
  if (aIn === bIn) return 0; // preserve original
  return aIn ? -1 : 1; // only push unadded ones below
});


  return (
    <div className="flex flex-col justify-start items-stretch min-h-[200px]">
      {ordered.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-16 text-gray-500">
          <p className="text-sm mb-3">oh.. nothing here yet</p>
          <button
            onClick={() => {/* trigger chat */ }}
            className="text-emerald-500 text-sm font-medium hover:underline"
          >
            chat with playlist bot →
          </button>
        </div>
      ) : (
        <motion.ul className="divide-y divide-gray-200 flex flex-col">
          <AnimatePresence mode="popLayout">
            {ordered.map(t => (
              <motion.li
                key={t.id}
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TrackItem
                  track={t}
                  inList={playlistIds.has(t.id)}
                  selected={selectedIds.has(t.id)}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onToggleSelect={onToggleSelect}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

      )}
    </div>
  );

}
