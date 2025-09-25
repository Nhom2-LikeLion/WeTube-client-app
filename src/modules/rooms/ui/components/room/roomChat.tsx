"use client";

import { useStompStore } from "@/store/zustand/useStompStore";
import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";

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

export default function RoomChat({
  roomId,
  username,
  stompClient,
}: RoomChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { publish, subscribe, unsubscribe } = useStompStore();
  const subscriptionRef = useRef<ReturnType<typeof subscribe> | null>(null);

  // 1️⃣ Setup & teardown chat
  useEffect(() => {
    if (!roomId) return;

    const topicEndpoint = `/topic/rooms/chat/${roomId}`;
    const publishEndpoint = `/app/chat/${roomId}`;

    // Subscribe to topic
    subscriptionRef.current = subscribe(topicEndpoint, (msg) => {
      try {
        const payload: ChatMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, payload]);
      } catch (err) {
        console.error("❌ Failed to parse message:", msg.body);
      }
    });

    // Gửi JOIN message
    publish(publishEndpoint, {
      type: "JOIN",
      sender: username,
      content: "Hello!",
    });

    // Cleanup
    return () => {
      unsubscribe(subscriptionRef.current);
      publish(publishEndpoint, {
        type: "LEAVE",
        sender: username,
      });
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3️⃣ Gửi tin nhắn
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const publishEndpoint = `/app/chat/${roomId}`;

    publish(publishEndpoint, {
      type: "CHAT",
      sender: username,
      content: input.trim(),
    });

    setInput("");
  };

  return (
    <div className="flex flex-col w-full min-w-0 h-full border rounded-lg shadow-md bg-white">
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
          className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
