// app/page.tsx
import { getToneData } from "@/src/content";
import ClientHome from "./ClientHome";

export default async function Home() {
  const toneData = await getToneData("emotional-bestie");
  if (!toneData) return null;

  return <ClientHome toneData={toneData} />;
}
