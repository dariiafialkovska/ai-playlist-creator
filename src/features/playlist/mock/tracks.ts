import type { Track } from "../domain/types";
export const CATALOG: Record<string, Track[]> = {
  party: [
    { id:"p1", title:"Levitating", artist:"Dua Lipa", cover:"./images/example10.png", url:"#"},
    { id:"p2", title:"Uptown Funk", artist:"Mark Ronson", cover:"/images/example5.png", url:"#"},
    { id:"p3", title:"One Kiss", artist:"Dua Lipa", cover:"/images/example7.png", url:"#"},
  ],
  chill: [
    { id:"c1", title:"Night Owl", artist:"Galimatias", cover:"/images/example2.png", url:"#"},
    { id:"c2", title:"Sunflower", artist:"Rex Orange County", cover:"/images/example4.png", url:"#"},
    { id:"c3", title:"Coffee", artist:"beabadoobee", cover:"/images/example6.png", url:"#"},
  ],
  throwback: [
    { id:"t1", title:"Toxic", artist:"Britney Spears", cover:"/images/example4.png", url:"#"},
    { id:"t2", title:"Hey Ya!", artist:"Outkast", cover:"/images/example2.png", url:"#"},
    { id:"t3", title:"Hips Don’t Lie", artist:"Shakira", cover:"/images/example7.png", url:"#"},
  ],
};
