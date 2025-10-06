export interface Track { id: string; title: string; artist: string; cover: string; url: string; }
export interface PlaylistResult { title: string; caption: string; tracks: Track[]; }
