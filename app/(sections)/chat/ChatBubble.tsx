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
        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm md:text-base
          shadow-[0_0_20px_rgba(120,70,255,0.15)] transition-all duration-200
          ${
            isUser
              ? "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white"
              : "bg-gradient-to-r from-[#312e81]/60 to-[#1e1b4b]/60 text-white border border-white/10 backdrop-blur-md"
          }`}
      >
        {children}
      </div>
    </div>
  );
}
