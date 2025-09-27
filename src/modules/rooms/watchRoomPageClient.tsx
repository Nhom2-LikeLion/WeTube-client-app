"use client";

import { useState, useEffect } from "react";
import {  useSearchParams } from "next/navigation";
import WatchRoomLayout from "@/modules/rooms/ui/components/room/watchRoomLayout";

export default function WatchRoomPageClient({ initialRoomId }: { initialRoomId?: string }) {
    const searchParams = useSearchParams();
    const [modalOpen, setModalOpen] = useState(!initialRoomId);
    const [roomId, setRoomId] = useState(initialRoomId || "");
    const [username, setUsername] = useState(() => searchParams.get("username") || "");

    useEffect(() => {
        if (initialRoomId && !username) {
            setModalOpen(true);
        }
    }, [initialRoomId, username]);


    return (
        <div className="relative h-full w-full">
            {roomId && username && (
                <WatchRoomLayout roomId={roomId} username={username} />
            )}
        </div>
    );
}