"use client";
import { ChatRole } from "@/src/types/message";

type Props = {
  role: ChatRole;
  children: React.ReactNode;
};

export default function ChatBubble({ role, children }: Props) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[80%] px-4 py-2 rounded-2xl shadow-sm",
          isUser
            ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-white"
            : "bg-white/80 backdrop-blur border border-black/5 text-gray-800",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
