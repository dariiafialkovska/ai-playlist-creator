import { State, Track } from "../domain/types";
import { reducer, } from "../domain/reducer";
import type { IPlaylistRepo } from "./ports";

type Listener = (s: State) => void;

export class PlaylistService {
  private state: State;
  private listeners = new Set<Listener>();
  constructor(private repo: IPlaylistRepo, seed: State) { this.state = seed; }

  static async create(repo: IPlaylistRepo) {
    const seed = (await repo.load()) ?? { playlist: [], selectedIds: new Set() };
    return new PlaylistService(repo, seed);
  }

  subscribe(l: Listener) { this.listeners.add(l); return () => this.listeners.delete(l); }
  snapshot() { return this.state; }
  private emit() { this.listeners.forEach(l => l(this.state)); }

  private async apply(next: State) {
    this.state = next;
    await this.repo.save(this.state);
    this.emit();
  }

  async add(track: Track) {
    await this.apply(reducer(this.state, { type:"ADD", track }));
    if (this.repo.add) await this.repo.add(track);
  }
  async remove(id: string) {
    await this.apply(reducer(this.state, { type:"REMOVE", id }));
    if (this.repo.remove) await this.repo.remove(id);
  }
  async toggleSelect(id: string) {
    await this.apply(reducer(this.state, { type:"TOGGLE_SELECT", id }));
  }
  getSelectedIds(): string[] { return Array.from(this.state.selectedIds); }
}
