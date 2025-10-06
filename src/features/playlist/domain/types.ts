export interface Track { id: string; title: string; artist: string; cover: string; url: string }
export interface State { playlist: Track[]; selectedIds: Set<string> }
export type Action =
  | { type:"ADD"; track: Track }
  | { type:"REMOVE"; id: string }
  | { type:"TOGGLE_SELECT"; id: string }
  | { type:"HYDRATE"; state: State };

export const initialState: State = { playlist: [], selectedIds: new Set() };
