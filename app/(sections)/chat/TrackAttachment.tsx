"use client";
import Image from "next/image";
import type { Track } from "@/src/features/playlist/domain/types";

type Props = { tracks: Track[] };

export default function TrackAttachment({ tracks }: Props) {
  if (!tracks.length) return null;

  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {tracks.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-lg p-2 border border-gray-200 shadow-sm"
        >
          <Image
            src={t.cover}
            alt={t.title}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-semibold truncate">{t.title}</span>
            <span className="text-[11px] text-gray-500 truncate">{t.artist}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
