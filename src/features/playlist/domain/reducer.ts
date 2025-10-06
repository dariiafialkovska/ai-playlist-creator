import { Action, State } from "./types";
export function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "ADD": return state.playlist.some(t=>t.id===a.track.id)?state:{...state, playlist:[a.track, ...state.playlist]};
    case "REMOVE": {
      const sel=new Set(state.selectedIds); sel.delete(a.id);
      return { ...state, playlist: state.playlist.filter(t=>t.id!==a.id), selectedIds: sel };
    }
    case "TOGGLE_SELECT": {
      const sel=new Set(state.selectedIds);
      sel.has(a.id)?sel.delete(a.id):sel.add(a.id);
      return { ...state, selectedIds: sel };
    }
    case "HYDRATE": return a.state;
    default: return state;
  }
}
