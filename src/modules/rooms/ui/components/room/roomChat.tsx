"use client";

import { useEffect, useRef, useState } from "react";
import { Room, RoomConnectOptions } from "livekit-client";

interface RoomChatProps {
    roomId: string;
    token: string;
    livekitUrl: string; // <-- thêm
}

export default function RoomChat({ roomId, token, livekitUrl }: RoomChatProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const roomRef = useRef<Room | null>(null);

    useEffect(() => {
        if (!token || !livekitUrl) return;

        const room = new Room();
        roomRef.current = room;

        const options: RoomConnectOptions = { autoSubscribe: true };

        (async () => {
            try {
                console.log("[RoomChat] connecting to", livekitUrl);
                await room.connect(livekitUrl, token, options);
                console.log("[RoomChat] connected");

                room.on("connected", () => {
                    console.log("[RoomChat] event: connected");
                });

                room.on("disconnected", () => {
                    console.log("[RoomChat] event: disconnected");
                });

                room.on("connectionStateChanged", (state) => {
                    console.log("[RoomChat] connectionStateChanged", state);
                });

                room.on("dataReceived", (payload, participant) => {
                    const msg = new TextDecoder().decode(payload);
                    console.log(
                        "[RoomChat] dataReceived",
                        "from identity:", participant?.identity,
                        "message:", msg
                    );
                    setMessages(prev => [...prev, `${participant?.identity}: ${msg}`]);
                });

            } catch (err) {
                console.error("[RoomChat] connect failed", err);
            }
        })();

        return () => {
            try {
                room.disconnect();
            } catch (e) {}
            roomRef.current = null;
        };
    }, [roomId, token, livekitUrl]);

    const sendMessage = () => {
        if (!input || !roomRef.current) return;
        const data = new TextEncoder().encode(input);
        // gửi reliable để ít bị drop
        roomRef.current.localParticipant.publishData(data, { reliable: true });
        setMessages(prev => [...prev, `You: ${input}`]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full p-3 border-l border-neutral-300">
            <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                {messages.map((msg, i) => (
                    <div key={i} className="text-sm">{msg}</div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    className="flex-1 border rounded px-2 py-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type message..."
                />
                <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
