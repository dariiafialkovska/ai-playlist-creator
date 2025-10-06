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
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-emerald-400 bg-white"
      />
      <button
        onClick={onSend}
        className="px-5 py-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition"
        aria-label={sendLabel}
        title={sendLabel}
      >
        →
      </button>
    </div>
  );
}
