"use client";
import { useEffect, useRef, useState } from "react";
import { PlaylistService } from "./PlaylistService";
import { LocalPlaylistRepo } from "../infra/LocalPlaylistRepo";

let serviceSingleton: PlaylistService | null = null;

export function usePlaylistController() {
  const [ready, setReady] = useState(false);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((p) => !p);

  const initOnce = useRef(false);
  useEffect(() => {
    if (initOnce.current) return;
    initOnce.current = true;

    (async () => {
      if (!serviceSingleton) {
        serviceSingleton = await PlaylistService.create(LocalPlaylistRepo);
      }

      const unsubscribe = serviceSingleton.subscribe((s) => {
        setPlaylist(s.playlist);
        setSelectedIds(s.selectedIds);
      });

      const snapshot = serviceSingleton.snapshot();
      setPlaylist(snapshot.playlist);
      setSelectedIds(snapshot.selectedIds);
      setReady(true);

      return () => unsubscribe();
    })();
  }, []);

  const service = serviceSingleton;

  return {
    ready,
    playlist,
    selectedIds,
    expanded,
    toggleExpand,
    add: async (t: any) => {
      if (!service) return;
      await service.add(t);
      setPlaylist(service.snapshot().playlist);
    },
    remove: async (id: string) => {
      if (!service) return;
      await service.remove(id);
      setPlaylist(service.snapshot().playlist);
    },
    toggleSelect: async (id: string) => {
      if (!service) return;
      await service.toggleSelect(id);
      setSelectedIds(service.snapshot().selectedIds);
    },
  };
}
