// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
//
// export interface ChatMessage {
//     user: string;
//     text: string;
// }
//
// export function useRoomChat(roomId: string) {
//     const [messages, setMessages] = useState<ChatMessage[]>([]);
//
//     useEffect(() => {
//         // Subscribe vào channel room
//         const channel = supabase
//             .channel(`room-${roomId}`)
//             .on("broadcast", { event: "new-message" }, (payload) => {
//                 setMessages(prev => [...prev, payload as any]);
//             })
//             .subscribe();
//
//         return () => {
//             supabase.removeChannel(channel);
//         };
//     }, [roomId]);
//
//     const sendMessage = async (text: string, user: string) => {
//         if (!text.trim()) return;
//         await supabase.channel(`room-${roomId}`).send({
//             type: "broadcast",
//             event: "new-message",
//             payload: { text, user },
//         });
//         setMessages(prev => [...prev, { user, text }]);
//     };
//
//     return { messages, sendMessage };
// }
