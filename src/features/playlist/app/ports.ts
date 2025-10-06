import { Track, State } from "../domain/types";

export interface IPlaylistRepo {
  load(): Promise<State | null>;          // get saved playlist for user
  save(state: State): Promise<void>;      // persist playlist + selection
  add?(track: Track): Promise<void>;      // optional remote add
  remove?(id: string): Promise<void>;     // optional remote remove
}
