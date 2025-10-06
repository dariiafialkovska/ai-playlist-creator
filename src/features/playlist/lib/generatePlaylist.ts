import type { PlaylistResult } from "../types";
import { CATALOG } from "../mock/tracks";
const pick = <T,>(a:T[], n:number)=>a.slice().sort(()=>0.5-Math.random()).slice(0,n);

export async function generatePlaylist(query: string): Promise<PlaylistResult> {
  await new Promise(r=>setTimeout(r,800));
  const q = query.toLowerCase();
  const bucket =
    q.includes("birthday")||q.includes("party")||q.includes("dance") ? "party" :
    q.includes("chill")||q.includes("coffee")||q.includes("night") ? "chill" :
    q.includes("2000")||q.includes("retro")||q.includes("throwback") ? "throwback" : "party";
  const tracks = pick(CATALOG[bucket], 5);
  return {
    title: bucket==="party"?"party energy":bucket==="chill"?"soft chill mix":"retro throwback",
    caption: bucket==="party"?"ok this actually slaps 🎉":bucket==="chill"?"soft beats, warm feels.":"nostalgia but make it loud.",
    tracks,
  };
}
