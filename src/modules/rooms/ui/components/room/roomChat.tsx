"use client";

import { useEffect, useRef, useState } from "react";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

interface ChatMessage {
    type: "CHAT" | "JOIN" | "LEAVE";
    sender: string;
    content?: string;
}

interface RoomChatProps {
    roomId: string;
    username: string;
    stompClient: Client;
}

export default function RoomChat({ roomId, username, stompClient }: RoomChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!stompClient) return;

        const onConnect = () => {
            console.log("✅ Connected to STOMP server");
            setIsConnected(true);

            console.log("📌 Subscribing to topic:", `/topic/rooms.chat.${roomId}`);
            const subscription: StompSubscription = stompClient.subscribe(
                `/topic/rooms.chat.${roomId}`,
                (msg: IMessage) => {
                    console.log("📩 Received:", msg.body);
                    const payload = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, payload]);
                }
            );

            stompClient.publish({
                destination: `/app/chat.${roomId}`,
                body: JSON.stringify({ type: "JOIN", sender: username }),
            });

            return () => {
                console.log("❌ Unsubscribing from topic:", `/topic/rooms.chat.${roomId}`);
                subscription.unsubscribe();
                if (stompClient.connected) {
                    stompClient.publish({
                        destination: `/app/chat.${roomId}`,
                        body: JSON.stringify({ type: "LEAVE", sender: username }),
                    });
                }
            };
        };

        const onDisconnect = () => {
            console.log("⚠️ Disconnected from STOMP server");
            setIsConnected(false);
        };

        stompClient.onConnect = onConnect;
        stompClient.onDisconnect = onDisconnect;

        if (!stompClient.connected) {
            console.log("🔄 Connecting STOMP client...");
            stompClient.activate();
        }

        return () => {
            stompClient.deactivate();
        };
    }, [stompClient, roomId, username]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !stompClient.connected) return;

        stompClient.publish({
            destination: `/app/chat.${roomId}`,
            body: JSON.stringify({ type: "CHAT", sender: username, content: input }),
        });

        setInput("");
    };

    return (
        <div className="flex flex-col w-full min-w-0 h-full border rounded-lg shadow-md bg-white">
            <div className="p-3 border-b font-semibold flex justify-between items-center">
                <span>Room Chat ({roomId})</span>
                <span className={`text-xs ${isConnected ? "text-green-600" : "text-red-500"}`}>
                    {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
                </span>
            </div>

            <div className="flex-1 h-64 overflow-y-auto p-3 space-y-2 bg-gray-50">
                {messages.map((msg, i) => (
                    <div key={i}>
                        {msg.type === "JOIN" && (
                            <p className="text-sm text-gray-500 italic">
                                {msg.sender} joined the room
                            </p>
                        )}
                        {msg.type === "LEAVE" && (
                            <p className="text-sm text-gray-500 italic">
                                {msg.sender} left the room
                            </p>
                        )}
                        {msg.type === "CHAT" && (
                            <p className="text-sm">
                                <b>{msg.sender}:</b> {msg.content}
                            </p>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="flex p-2 border-t">
                <input
                    type="text"
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={!isConnected}
                    className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded disabled:bg-gray-400"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
