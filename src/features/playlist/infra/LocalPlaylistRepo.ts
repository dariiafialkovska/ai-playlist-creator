import type { IPlaylistRepo } from "../app/ports";
import type { State } from "../domain/types";
const KEY="playlist.store.v1";

export const LocalPlaylistRepo: IPlaylistRepo = {
  async load(): Promise<State | null> {
    if (typeof window==="undefined") return null;
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as { playlist:any[]; selectedIds:string[] };
    return { playlist: p.playlist||[], selectedIds: new Set(p.selectedIds||[]) };
  },
  async save(state: State) {
    if (typeof window==="undefined") return;
    const payload = { playlist: state.playlist, selectedIds: Array.from(state.selectedIds) };
    localStorage.setItem(KEY, JSON.stringify(payload));
  },
};
