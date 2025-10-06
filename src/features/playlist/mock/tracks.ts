import type { Track } from "../domain/types";
export const CATALOG: Record<string, Track[]> = {
  party: [
    { id:"p1", title:"Levitating", artist:"Dua Lipa", cover:"/demo/levitating.jpg", url:"#"},
    { id:"p2", title:"Uptown Funk", artist:"Mark Ronson", cover:"/demo/uptown.jpg", url:"#"},
    { id:"p3", title:"One Kiss", artist:"Dua Lipa", cover:"/demo/onekiss.jpg", url:"#"},
  ],
  chill: [
    { id:"c1", title:"Night Owl", artist:"Galimatias", cover:"/demo/nightowl.jpg", url:"#"},
    { id:"c2", title:"Sunflower", artist:"Rex Orange County", cover:"/demo/sunflower.jpg", url:"#"},
    { id:"c3", title:"Coffee", artist:"beabadoobee", cover:"/demo/coffee.jpg", url:"#"},
  ],
  throwback: [
    { id:"t1", title:"Toxic", artist:"Britney Spears", cover:"/demo/toxic.jpg", url:"#"},
    { id:"t2", title:"Hey Ya!", artist:"Outkast", cover:"/demo/heyya.jpg", url:"#"},
    { id:"t3", title:"Hips Don’t Lie", artist:"Shakira", cover:"/demo/hips.jpg", url:"#"},
  ],
};
