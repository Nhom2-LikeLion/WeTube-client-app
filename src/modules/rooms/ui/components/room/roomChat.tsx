"use client";

import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, over } from "stompjs";

interface ChatMessage {
    type: "CHAT" | "JOIN" | "LEAVE";
    sender: string;
    content?: string;
}

export default function RoomChat({ roomId, username }: { roomId: string; username: string }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const stompClientRef = useRef<Client | null>(null);

    // Kết nối WebSocket
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws"); // backend endpoint
        const stompClient = over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            // Subscribe vào topic chung (hoặc bạn có thể dùng `/topic/room.{roomId}`)
            stompClient.subscribe("/topic/public", (payload) => {
                const message: ChatMessage = JSON.parse(payload.body);
                setMessages((prev) => [...prev, message]);
            });

            // Gửi sự kiện JOIN
            stompClient.send(
                "/app/chat.addUser",
                {},
                JSON.stringify({ sender: username, type: "JOIN" })
            );
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect(() => {
                    console.log("Disconnected");
                });
            }
        };
    }, [roomId, username]);

    // Gửi message
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && stompClientRef.current) {
            const chatMessage: ChatMessage = {
                sender: username,
                content: input,
                type: "CHAT",
            };
            stompClientRef.current.send(
                "/app/chat.sendMessage",
                {},
                JSON.stringify(chatMessage)
            );
            setInput("");
        }
    };

    return (
        <div className="flex flex-col w-full max-w-md border rounded-lg shadow-md bg-white">
            <div className="p-3 border-b font-semibold">Room Chat ({roomId})</div>

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
                                <span className="font-bold">{msg.sender}: </span>
                                {msg.content}
                            </p>
                        )}
                    </div>
                ))}
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
                    className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
