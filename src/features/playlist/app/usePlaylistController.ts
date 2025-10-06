"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PlaylistService } from "./PlaylistService";
import { LocalPlaylistRepo } from "../infra/LocalPlaylistRepo";

let serviceSingleton: PlaylistService | null = null;

export function usePlaylistController() {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<{ playlist: any[]; selectedIds: Set<string> }>({
    playlist: [],
    selectedIds: new Set(),
  });

  // init once
  const initOnce = useRef(false);
  useEffect(() => {
    if (initOnce.current) return;
    initOnce.current = true;

    (async () => {
      if (!serviceSingleton) {
        serviceSingleton = await PlaylistService.create(LocalPlaylistRepo);
      }
      // subscribe after service exists
      const unsubscribe = serviceSingleton.subscribe((s) => setState(s));
      setState(serviceSingleton.snapshot());
      setReady(true);
      return () => unsubscribe();
    })();
  }, []);

  const service = serviceSingleton;

  return {
    state,
    add: async (t: any) => service?.add(t),
    remove: async (id: string) => service?.remove(id),
    toggleSelect: async (id: string) => service?.toggleSelect(id),
    getSelectedIds: () => (service ? service.getSelectedIds() : []),
    ready,
  };
}
