"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { useEffect, useState } from "react";

interface LiveKitRoomWrapperProps {
    roomId: string;
    userId: string;
    children: React.ReactNode;
}

export default function LiveKitRoomWrapper({ roomId, userId, children }: LiveKitRoomWrapperProps) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        async function fetchToken() {
            const res = await fetch("/api/livekit/create-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomName: roomId, userId }),
            });
            const data = await res.json();
            setToken(data.token);
        }
        fetchToken();
    }, [roomId, userId]);

    if (!token) return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;

    return (
        <LiveKitRoom
            token=""
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
            connect={true}
            video={true}
            audio={true}
            className="h-screen w-full"
        >
            {children}
        </LiveKitRoom>
    );
}
