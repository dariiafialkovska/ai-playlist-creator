"use client";
import type { Track } from "../domain/types";
import TrackItem from "./TrackItem";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  tracks: Track[];
  playlistIds: Set<string>;
  selectedIds: Set<string>;
  selectMode?: boolean;
  onAdd: (t: Track) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

export default function TrackList({
  tracks,
  playlistIds,
  selectedIds,
  selectMode = false,
  onAdd,
  onRemove,
  onToggleSelect,
}: Props) {
  const ordered = [...tracks].sort((a, b) => {
    const aIn = playlistIds.has(a.id);
    const bIn = playlistIds.has(b.id);
    if (aIn === bIn) return 0;
    return aIn ? -1 : 1;
  });

  return (
    <motion.ul className="divide-y divide-gray-200 flex flex-col">
      <AnimatePresence mode="popLayout">
        {ordered.map((t) => (
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
              selectMode={selectMode}
              onAdd={onAdd}
              onRemove={onRemove}
              onToggleSelect={onToggleSelect}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
