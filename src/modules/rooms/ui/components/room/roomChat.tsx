// "use client";
//
// import { useDataChannel } from "@livekit/components-react";
// import { useState, useEffect } from "react";
//
// export default function ChatPanel({ roomId }: { roomId: string }) {
//     // phải truyền label + options (ví dụ reliable)
//     const { send, message } = useDataChannel(roomId, { reliable: true });
//     const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
//     const [input, setInput] = useState("");
//
//     useEffect(() => {
//         if (message) {
//             // message.payload là Uint8Array nên cần decode
//             const text = new TextDecoder().decode(message.payload);
//             setMessages((prev) => [...prev, { id: Date.now(), text }]);
//         }
//     }, [message]);
//
//     const sendMessage = () => {
//         if (!input) return;
//         // hook này cho phép gửi string trực tiếp
//         send(input);
//         setInput("");
//     };
//
//     return (
//         <div className="flex flex-col h-full">
//             <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white">
//                 {messages.length === 0 ? (
//                     <div className="text-neutral-900 text-sm text-center">No messages yet</div>
//                 ) : (
//                     messages.map((m) => (
//                         <div
//                             key={m.id}
//                             className="bg-neutral-100 rounded-lg px-2 py-1 text-sm"
//                         >
//                             {m.text}
//                         </div>
//                     ))
//                 )}
//             </div>
//             <div className="p-2 border-t border-neutral-200">
//                 <input
//                     className="w-full bg-neutral-100 rounded-lg px-3 py-2 text-sm outline-none"
//                     placeholder="Type message..."
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 />
//             </div>
//         </div>
//     );
// }
