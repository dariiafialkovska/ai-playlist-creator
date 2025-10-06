export type ChatRole = "bot" | "user";

export interface Message {
  id: string;
  role: ChatRole;
  text: string;
  at: number;
}
