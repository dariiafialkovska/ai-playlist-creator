import { notFound } from "next/navigation";
import { getToneData } from "@/src/content";
import ClientTonePage from "./ClientTonePage";
export default async function TonePage({ params }: { params: { tone: string } }) {
  const toneData = await getToneData(params.tone);
  if (!toneData) notFound();

  return <ClientTonePage toneData={toneData} />;
}
