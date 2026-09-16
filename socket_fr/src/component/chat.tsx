import { useEffect, useRef } from "react";

export default function ChatRender({ msg }: { msg: string[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom on every new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <div className="w-full flex flex-col gap-2">
      {msg.map((m, i) => (
        <div
          key={i}
          className="bg-gray-800 text-white px-4 py-2 border border-gray-700 rounded-lg max-w-md break-words self-start"
        >
          {m}
        </div>
      ))}
      {/* Invisible anchor to scroll into view */}
      <div ref={bottomRef} />
    </div>
  );
}