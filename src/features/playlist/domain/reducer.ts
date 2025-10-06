import { Action, State } from "./types";

export function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "ADD":
      if (state.playlist.some(t => t.id === a.track.id)) return state;
      return { ...state, playlist: [a.track, ...state.playlist] };

    case "REMOVE": {
      const nextSel = new Set(state.selectedIds);
      nextSel.delete(a.id);
      const nextPlaylist = state.playlist.filter(t => t.id !== a.id);
      return { ...state, playlist: nextPlaylist, selectedIds: nextSel };
    }

    case "TOGGLE_SELECT": {
      const next = new Set(state.selectedIds);
      next.has(a.id) ? next.delete(a.id) : next.add(a.id);
      return { ...state, selectedIds: next };
    }

    case "HYDRATE":
      return a.state;

    default:
      return state;
  }
}
