import fs from "fs";
import path from "path";

export async function getToneData(tone: string) {
  const file = path.join(process.cwd(), "src", "content", `${tone}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = await fs.promises.readFile(file, "utf8");
  return JSON.parse(raw);
}
