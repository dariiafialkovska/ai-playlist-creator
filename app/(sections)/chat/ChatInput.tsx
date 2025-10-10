"use client";
type Props = {
  value: string;
  placeholder: string;
  sendLabel?: string;
  onChange: (v: string) => void;
  onSend: () => void;
};

export default function ChatInput({
  value,
  placeholder,
  sendLabel = "Send",
  onChange,
  onSend,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* input */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-full bg-white/[0.04] 
                   text-white placeholder-white/40 
                   border border-white/10 backdrop-blur-md
                   focus:outline-none focus:border-white/30 
                   focus:shadow-[0_0_10px_rgba(255,255,255,0.2)]
                   transition-all duration-200"
      />

      {/* send button */}
      <button
        onClick={onSend}
        aria-label={sendLabel}
        title={sendLabel}
        className="px-5 py-3 rounded-full text-white 
                   bg-white/[0.06] border border-white/10
                   backdrop-blur-md cursor-pointer
                   hover:bg-white/[0.15]
                   hover:shadow-[0_0_12px_rgba(255,255,150,0.45)]
                   active:scale-[0.97]
                   transition-all duration-200"
      >
        →
      </button>
    </div>
  );
}
