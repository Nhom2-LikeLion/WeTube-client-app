"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RoomModal from "@/modules/rooms/ui/components/room/roomModal";
import WatchRoomLayout from "@/modules/rooms/ui/components/room/watchRoomLayout";

export default function WatchRoomPageClient({ initialRoomId }: { initialRoomId?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [modalOpen, setModalOpen] = useState(!initialRoomId);
    const [roomId, setRoomId] = useState(initialRoomId || "");

    const [username, setUsername] = useState(() => searchParams.get("username") || "");

    const handleRoomCreated = (newRoomId: string, newUsername: string) => {
        router.push(`/rooms/${newRoomId}?username=${encodeURIComponent(newUsername)}`);
        setRoomId(newRoomId);
        setUsername(newUsername);
        setModalOpen(false);
    };

    useEffect(() => {
        if (initialRoomId && !username) {
            setModalOpen(true);
        }
    }, [initialRoomId, username]);


    return (
        <div className="relative h-full w-full">
            <RoomModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                onRoomCreated={handleRoomCreated}
            />

            {roomId && username && (
                <WatchRoomLayout roomId={roomId} username={username} />
            )}
        </div>
    );
}