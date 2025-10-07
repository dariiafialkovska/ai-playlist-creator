export type ChatRole = "bot" | "user";
import type { Track } from "@/src/features/playlist/domain/types";

export type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  at: number;
  attachments?: Track[]; // ✅ add this optional field
};

